export class InviteParticipantDto {
  readonly name: string | null;
  readonly email: string;
  readonly destination: string;
  readonly startsAt: Date;
  readonly endsAt: Date;
  readonly confirmationLink: string;
}
