const Express = require('express');
var cors = require('cors');
// var helmet = require('helmet');
const cookieParser = require('cookie-parser');
let verifyJWT = require('./MiddleWare/verifyJWT')

const App = Express();


App.use(Express.json());
App.use(cookieParser());

App.use(cors());
// App.use(helmet());

// App.use(Express.json({ limit: '20mb' }));

const Mongoose = require("mongoose");
// const url = "mongodb://127.0.0.1/AdvisorLink";
const url = "mongodb+srv://admin:admin1234@dhobionline.agzb49y.mongodb.net/";


Mongoose.connect(url, { useNewUrlParser: true });
const Mongo = Mongoose.connection;

Mongo.on("open", () => {
  console.log("MongoDB Connected!");
});


App.get('/api', (req, res) => {
  res.send('Hello, This is React Backend!');
});



// super admin
App.use('/api/super_admin', require('./Route/super_admin/super_admin'));

// DI_thresholds
App.use('/api/LIHC_DI_threshold', require('./Route/LIHC/DI_threshold/DI_threshold'));

// deeming_rates
App.use('/api/LIHC_deeming_rates', require('./Route/LIHC/deeming_rates/deeming_rates'));

// income_test
App.use('/api/LIHC_income_test', require('./Route/LIHC/income_test/income_test'));

// Commomwelth calculater

App.use('/api/CW_DI_threshold', require('./Route/Commonwelth/DI_threshold/DI_threshold'));

// deeming_rates
App.use('/api/CW_deeming_rates', require('./Route/Commonwelth/deeming_rates/deeming_rates'));

// income_test
App.use('/api/CW_income_test', require('./Route/Commonwelth/income_test/income_test'));


// ---------- pension calculator ----------

// actual_payment 
App.use('/api/pension_actual_payment', require('./Route/Pension/actual_payment/actual_payment'));

// asset_test
App.use('/api/pension_asset_test', require('./Route/Pension/asset_test/asset_test'));

// deemed_income
App.use('/api/pension_deemed_income', require('./Route/Pension/deemed_income_thresholds/deemed_income_thresholds'));

// deeming_rates
App.use('/api/pension_deeming_rates', require('./Route/Pension/deeming_rates/deeming_rates'));

// income_test
App.use('/api/pension_income_test', require('./Route/Pension/income_test/income_test'));

// reduced_by
App.use('/api/pension_reduced_by', require('./Route/Pension/reduced_by/reduced_by'));

// work_bonus
App.use('/api/pension_work_bonus', require('./Route/Pension/work_bonus/work_bonus'));

// LIHC all tables api
App.use('/api/LIHC_allTables', require('./Route/LIHC/LIHC_all_tables/LIHC_all_tables'));

// Common Wealth all tables api
App.use('/api/CW_allTables', require('./Route/Commonwelth/CW_all_tables/CW_all_tables'));

// Pension all tables api
App.use('/api/pension_allTables', require('./Route/Pension/pension_all_tables/pension_all_tables'));

// Advisers Registration and CRUD
App.use('/api/Adviser', require('./Route/Adviser/Advisers'));

// Seeder
App.use('/GetData', require('./Route/Seeder/Seeder'));

// Advisers Registration and CRUD
App.use('/api/Logintest', require('./Route/Adviser/Login/logintest'));
App.use('/api/Login', require('./Route/Adviser/Login/Login'));
App.use('/api/refresh', require('./Route/Adviser/Login/Refresh'));
App.use('/api/Logout', require('./Route/Adviser/Login/Logout'));

//User Tracking
App.use('/api/UserTrack', require('./Route/Adviser/UserTrack/UserTrack'));
App.use('/api/UserTrackAddLIHC', require('./Route/combineduserTD/combinedUserTD'));

App.use('/api/UserTrackAddCSHC', require('./Route/combineduserCSHC/combinedUserCSHC'));

App.use('/api/UserTrackAddPension', require('./Route/combineduserPension/combineduserPension'));




App.use('/api/UserTrack-AgePension', require('./Route/UserData/AgePension'));
App.use('/api/UserTrack-CSHC', require('./Route/UserData/CSHC'));
App.use('/api/UserTrack-LIHC', require('./Route/UserData/LIHC'));

// Email
App.use('/api/email', require('./Route/Mailer/mailer'));

// adviser_theme
App.use('/api/adviser_theme', require('./Route/Adviser/adviser_theme/adviser_theme'));
App.use('/uploads',Express.static('uploads'))


App.use(verifyJWT);


const port = process.env.PORT || 7000;


App.listen(port, () => {
  console.log("Server Running on port:",port);
});