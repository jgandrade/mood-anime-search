import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CreateUserBySupabaseIdUseCase } from "../../useCases/createUserBySupabaseIdUseCase";
import { UserRepository } from "../../persistence/user/userRepository";

export class UserController {
  private readonly userRepository: UserRepository;
  private readonly createUserBySupabaseIdUseCase: CreateUserBySupabaseIdUseCase;

  constructor() {
    this.userRepository = new UserRepository();
    this.createUserBySupabaseIdUseCase = new CreateUserBySupabaseIdUseCase(
      this.userRepository
    );
  }

  // Direct method for internal use
  public async createUserBySupabaseId(supabaseId: string) {
    return this.createUserBySupabaseIdUseCase.execute({ supabaseId });
  }

  // API route handler
  public async createUser(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const { supabaseId } = body;

      if (!supabaseId) {
        return NextResponse.json(
          { error: "Supabase ID is required" },
          { status: 400 }
        );
      }

      const result = await this.createUserBySupabaseId(supabaseId);

      if (result.isFailure) {
        return NextResponse.json({ error: result.getError() }, { status: 400 });
      }

      return NextResponse.json({ user: result.getValue() }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}

// Route Handler
export async function POST(req: NextRequest) {
  const controller = new UserController();
  return controller.createUser(req);
}
