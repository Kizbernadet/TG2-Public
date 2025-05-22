const loginService = require('../services/loginService');

async function login(req, res) {
  const { matricule, password } = req.body;

  try {
    const user = await loginService.authenticate(matricule, password);

    // Ici tu peux gérer la session, ou renvoyer un token JWT, etc.
    res.json({
      status: 'accepted',
      redirect: '/categories',
      user,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = { login };
