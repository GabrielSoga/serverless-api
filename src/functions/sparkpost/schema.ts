export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    age: { type: 'string ' }
  },
  required: ['name', 'age']
} as const;