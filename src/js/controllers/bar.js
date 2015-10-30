// This is so generic. Do I need this boilerplate?
// Maybe I can pass this data directly to the view.
// Or wait. Maybe I should chill and figure this out.
export default function(args) {
  return {
    type: args.type,
    value: args.value,
    max: args.max
  };
};
