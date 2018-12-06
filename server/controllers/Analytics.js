// Serves the stats page
const analyticsPage = (req, res) => res.render('analytics', { csrfToken: req.csrfToken() });

// Exports
module.exports.analyticsPage = analyticsPage;
