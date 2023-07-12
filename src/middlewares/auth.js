export function isAdmin(req, res, next) {
  if (req.session?.user?.rol == "admin") {
        return next();
    }
    return res.status(401).render("error", { error: 'Authorization error'});

  }
export function isUser(req, res, next) {
  if (req.session?.user?._id) {

        return next();
    }
    return res.status(401).render("error", { error: 'Authentication error'});
  }

  export function checkLogin(req, res, next) {
    if (req.session?.user?._id) {
      return next();
    } else {
      return res.status(401).render("error");
    }
  }