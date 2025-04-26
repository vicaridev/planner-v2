export interface UpdateTripStatusDTO {
  tripId: string;
  isConfirmed?: boolean;
  isOwner?: boolean;
}
