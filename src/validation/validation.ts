export default async (request, h, err) => {
  console.log(err)
  // eslint-disable-next-line no-param-reassign
  delete err.output.payload.validation
  throw err
}
