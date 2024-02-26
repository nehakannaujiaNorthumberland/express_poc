const injectRequest= (req, res, next) => {
    const viewEngine = res.app.get("engine");
    viewEngine.addGlobal("request", req);
    next();
}

export default injectRequest