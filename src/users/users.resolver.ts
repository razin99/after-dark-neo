import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { GetUser } from 'src/decorators/user.decorator';
import { PaginateInput } from 'src/dto/paginate.input';
import { SortUserInput } from './dto/sort-user.input';

@Resolver(() => User)
@UseGuards(AuthenticatedGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args('paginate', { type: () => PaginateInput, nullable: true })
    paginate?: PaginateInput,
    @Args('sort', { type: () => SortUserInput, nullable: true })
    sort?: SortUserInput,
  ) {
    return this.usersService.findAll(paginate, sort);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => Boolean)
  removeUser(
    @Args('id', { type: () => Int }) id: number,
    @GetUser() user: User,
  ) {
    if (id !== user.id) throw new UnauthorizedException();
    return this.usersService.remove(id);
  }

  @Mutation(() => Boolean)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('id') id: number,
    @GetUser() user: User,
  ) {
    if (id !== user.id) throw new UnauthorizedException();
    return this.usersService.update(id, updateUserInput);
  }
}
