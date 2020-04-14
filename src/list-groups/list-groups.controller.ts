import { Controller, Body, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateListGroupDto } from '../core/dto/list-groups/create-list-group.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { ListGroup } from '../core/entities/list-group.entity';
import { ListGroupsService } from '../core/services/list-groups.service';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('list-groups')
@UseGuards(AuthGuard())
export class ListGroupsController {
    private logger = new Logger("ListGroupGroupsController");

    constructor(private listGroupsService: ListGroupsService) { }

    @Get()
    getAll(@GetUser() user: User): Promise<ListGroup[]> {
        this.logger.verbose(`User "${user.externalUserId}" retrieving listGroups.`)
        return this.listGroupsService.getListGroups(user);
    }

    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number, @GetUser() user: User): Promise<ListGroup> {
        return this.listGroupsService.getListGroupById(id, user);
    }

    @Post()
    add(@Body() body: CreateListGroupDto, @GetUser() user: User): Promise<ListGroup> {
        this.logger.verbose(`User "${user.name}" creating listGroup with parameters: ${JSON.stringify(body)}`)
        return this.listGroupsService.createListGroup(body, user);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) id: number,  @GetUser() user: User): Promise<{ statusCode: number }> {
        await this.listGroupsService.deleteListGroup({ id }, user);
        return { statusCode: 200 };
    }

    @Patch(":id/name") 
    updateName(@Param("id", ParseIntPipe) id: number, @GetUser() user: User, @Body("name") name: string ): Promise<ListGroup> {
        return this.listGroupsService.updateListGroup({ id, name }, user);
    }
}
