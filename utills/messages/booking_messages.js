const booking_success_messages = {
  slot_available: "Slot available for booking",
  refund_applicable: "You are able to get refund on cancellation",
  booking_cancelled: "Booking Cancelled",
  booking_saved:"Booking saved successfully"
};

const booking_error_messages = {
  slot_already_booked: "Slot already booked",
  unavailable_slot: "Unavailable slot chosen",
  minimum_hour_less: "This spot is available for minimum ",
  crosses_limit_attendies: "Max attendies limit exceed",
  date_blocked: "Selected date is not available",
  invalid_booking_id: "Invalid booking id provided",
  empty_booking_id: "Please provide booking id",
  refund_not_applicable: "No refund will be provided",
  empty_spot_id: "Empty spot id provided",
  invalid_spot_id: "Invalid spot id provided",
};

module.exports = {
  booking_success_messages,
  booking_error_messages,
};
