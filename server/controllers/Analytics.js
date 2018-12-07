// serves the page
const analyticsPage = (req, res) => res.render('analytics', { csrfToken: req.csrfToken() });

// export
module.exports.analyticsPage = analyticsPage;
