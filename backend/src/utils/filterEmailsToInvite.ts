import { Participant } from 'src/participants/interface/participant.interface';

export const filterEmailsToInvite = (
  participantsEmails: Participant[],
  emailsToInvite: string[],
): string[] => {
  return participantsEmails.reduce((acc: string[], participant) => {
    if (!emailsToInvite.includes(participant.email) && !participant.isOwner) {
      acc.push(participant.email);
    }
    return acc;
  }, []);
};
