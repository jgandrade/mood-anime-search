import type { UseCase } from "../../../core/domain/UseCase";
import { User } from "../domain/user/User";
import type { UserRepository } from "../persistence/user/userRepository";
import { Result } from "../../../core/logic/Result";

interface CreateUserBySupabaseIdDTO {
  supabaseId: string;
}

type Response = Result<User>;

export class CreateUserBySupabaseIdUseCase
  implements UseCase<CreateUserBySupabaseIdDTO, Response>
{
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(request: CreateUserBySupabaseIdDTO): Promise<Response> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findBySupabaseId(
        request.supabaseId
      );

      if (existingUser) {
        return Result.fail<User>("User already exists");
      }

      // Create new user
      const user = User.create({
        supabaseId: request.supabaseId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Save to repository
      await this.userRepository.save(user);

      return Result.ok<User>(user);
    } catch (error) {
      return Result.fail<User>(`Failed to create user: ${error}`);
    }
  }
}
