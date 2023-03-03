import { JwtAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(JwtAuthGuard).toBeDefined();
  });
});
