// Facts about the current visit that are not part of the save.
export const session = {
  // When the loaded save was last written: roughly when the player left last time (0 for a new player).
  lastSeen: 0,
  // The welcome-back card is shown at most once per visit.
  welcomed: false,
};
