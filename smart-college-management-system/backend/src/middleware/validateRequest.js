// Central placeholder for request validation (can be extended with express-validator)
function validateOrThrow(req) {
  // No-op: project currently validates inside controllers/routes.
  return req;
}

module.exports = { validateOrThrow };

