import { UserModel } from '..//DAO/Mongo/models/users.model.js';
import logger from '../utils/logger.js';

const renderSessionView = (req, res) => {
    return res.send(JSON.stringify(req.session));
};

const renderLoginView = (req, res) => {
    return res.render("login", {});
};

const handleLogin = (req, res) => {
    if (!req.user) {
        return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role,cartId: req.user.cartId };
    return res.redirect('/products');
};

const renderFailLoginView = async (req, res) => {
    return res.json({ error: 'fail to login' });
};

const renderRegisterView = (req, res) => {
    return res.render("register", {});
};

const handleRegister = (req, res) => {
    if (!req.user) {
        return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, isAdmin: req.user.isAdmin };
    return res.json({ msg: 'ok', payload: req.user });
};

const renderFailRegisterView = async (req, res) => {
    logger.debug('fail to register');
    return res.json({ error: 'fail to register' });
};

const renderProductsView = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.session.email });
        if (user) {
            console.log(user)
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                cartId: user.cartId,
                role: user.role,
            };
            logger.debug('Rendering products view with user data:', userData);
            return res.render('products', { user: userData });
        } else {
            logger.debug('Rendering products view with no user data');
            return res.render('products', { user: null });
        }
    } catch (error) {
        logger.error('Error retrieving user data:', error);
        return res.render('products', { user: null, error: 'Error retrieving user data' });
    }
};

const renderProfileView = (req, res) => {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin };
    return res.render('profile', { user: user });
};

const handleLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', { error: 'session couldnt be closed' });
        }
        return res.redirect('/auth/login');
    });
};

const renderAdministrationView = (req, res) => {
    return res.send(req.session.user);
};

export default  {
    renderSessionView,
    renderLoginView,
    handleLogin,
    renderFailLoginView,
    renderRegisterView,
    handleRegister,
    renderFailRegisterView,
    renderProductsView,
    renderProfileView,
    handleLogout,
    renderAdministrationView,
};