var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require('fs')
var cors = require("cors");
const bodyParser = require('body-parser')

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var contactListsAPIRouter = require("./routes/contactListsAPI")
var documentAPIRouter = require("./routes/DocumentAPI");
var documentCheckListAPIRouter = require("./routes/DocumentCheckListAPI");
var imonoAPIRouter = require("./routes/ImonoAPI");
var vesselAPIRouter = require("./routes/VesselAPI");
var issuingAuthorityAPIRouter = require("./routes/IssuingAuthorityAPI");
var positionAPIRouter = require("./routes/PositionAPI");
var raceAPIRouter = require("./routes/RaceAPI");
var religionAPIRouter = require("./routes/ReligionAPI");
var relationshipAPIRouter = require("./routes/RelationshipAPI");
var stateAPIRouter = require("./routes/StateAPI");
var countryAPIRouter = require("./routes/CountryAPI");
var allowanceAPIRouter = require("./routes/AllowanceAPI");
var applicantAPIRouter = require("./routes/ApplicantAPI");
var applicationAPIRouter = require("./routes/ApplicationAPI");
var userIdConfigureAPIRouter = require("./routes/UserIdConfigureAPI");
var portOfRegistryAPIRouter = require("./routes/PortOfRegistryAPI");
var openVacancyAPIRouter = require("./routes/OpenVacancyAPI");
var MatrixAPIRouter = require("./routes/MatrixAPI");
var MatrixDataAPIRouter = require("./routes/MatrixDataAPI");
var MatrixTemplateAPIRouter = require("./routes/MatrixTemplateAPI");
var MatrixFieldAPIRouter = require("./routes/MatrixFieldAPI");
var FileUploadAPIRouter = require("./routes/FileUploadAPI");
var VesselNameAPIRouter = require("./routes/VesselNameAPI");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
// setup the logger
app.use(logger('combined', { stream: accessLogStream }))

// setting fileupload limit - 50MB
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true,
parameterLimit:50000}));


//const basicAuth = require('_helpers/basic-auth');
//const errorHandler = require('_helpers/error-handler');

// use basic HTTP auth to secure the api
//app.use(basicAuth);
app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'UPDATE', 'DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/document", documentAPIRouter);
app.use("/documentchecklist", documentCheckListAPIRouter);
app.use("/imono", imonoAPIRouter);
app.use("/vessel", vesselAPIRouter);
app.use("/issuingauthority", issuingAuthorityAPIRouter);
app.use("/contact_lists", contactListsAPIRouter);
app.use("/position", positionAPIRouter);
app.use("/race", raceAPIRouter);
app.use("/religion", religionAPIRouter);
app.use("/relationship", relationshipAPIRouter);
app.use("/state", stateAPIRouter);
app.use("/country", countryAPIRouter);
app.use("/allowance", allowanceAPIRouter);
app.use("/applicant", applicantAPIRouter);
app.use("/application", applicationAPIRouter);
app.use("/useridconfigure", userIdConfigureAPIRouter);
app.use("/portofregistry", portOfRegistryAPIRouter);
app.use("/openvacancy", openVacancyAPIRouter);
app.use("/matrix", MatrixAPIRouter);
app.use("/matrix_template", MatrixTemplateAPIRouter);
app.use("/matrix_field", MatrixFieldAPIRouter);
app.use("/file_upload", FileUploadAPIRouter);
app.use("/matrix_data", MatrixDataAPIRouter);
app.use("/vessel_name", VesselNameAPIRouter);
//require('./routes/FileUploadAPI')(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get("env") === "development" ? err : {};

// render the error page
res.status(err.status || 500);
res.render("error");
});

module.exports = app;