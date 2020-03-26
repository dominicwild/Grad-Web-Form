const router = require("express").Router();
const credential = "SECRET";

router.post("/login", (req, res) => {
  credentials = req.body;
  console.log(req.body)
  console.log(`Got credentials user: ${credentials.username} pass: ${credentials.password}`);
  if (credentials.username && credentials.password) {
    return res.status(200).json({ credential });
  } else {
    return res.status(400).json({ errMsg: "Credentials invalid or not supplied." });
  }
});

router.get("/genders", (req, res) => {
  return res.status(200).json({
    genders: [
      {
        id: 1,
        name: "Prefer not to say"
      },
      {
        id: 2,
        name: "Male"
      },
      {
        id: 3,
        name: "Female"
      },
      {
        id: 4,
        name: "Other"
      }
    ]
  });
});

router.post("/user", (req, res) => {
  data = req.body;
  //data.firstName && data.lastName && data.GenderId && data.email && data.StudyFieldId && data.StreamId && data.credential && data.LocationId
  if (data.firstName && data.lastName && data.email) {
    console.log(data);
    return res.status(200).json({
      msg: "Data successfully uploaded.",
      success:true,
      data
    });
  } else {
    return res.status(400).json({
      msg: "Data is missing and was not uploaded.",
      success:false
    });
  }
});

router.get("/studyFields", (req, res) => {
  return res.status(200).json({
    studyFields: [
      {
        id: 1,
        name: "Computer Science"
      },
      {
        id: 2,
        name: "History"
      },
      {
        id: 3,
        name: "Psychology"
      },
      {
        id: 4,
        name: "Mathematics"
      }
    ]
  });
});

router.get("/locations", (req, res) => {
  return res.status("200").json({
    locations: [
      {
        id: 1,
        name: "Edgehill",
        latitude: 53.5560,
        longitude: 2.8707
      },
      {
        id: 2,
        name: "Chorley",
        latitude: 53.6535,
        longitude: 2.6326
      },
      {
        id: 3,
        name: "Newcastle",
        latitude: 54.9792,
        longitude: 1.6147
      },
      {
        id: 31,
        name: "Manchester",
        latitude: 53.4668,
        longitude: 2.2339
      },
      {
        id: 131,
        name: "Liverpool",
        latitude: 53.4048,
        longitude: 2.9653
      },
      {
        id: 4,
        name: "Lancaster",
        latitude: 54.0104,
        longitude: 2.7877
      }
    ]
  });
});

router.get("/streams", (req, res) => {
  return res.status("200").json({
    streams: [
      {
        id: 1,
        name: "General"
      },
      {
        id: 2,
        name: "Technical"
      }
    ]
  });
});

module.exports = router;
