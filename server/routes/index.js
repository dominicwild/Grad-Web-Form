const router = require("express").Router();
const credential = "SECRET";

router.post("/login", (req, res) => {
  credentials = req.body;
  console.log(req.body)
  console.log(`Got credentials user: ${credentials.username} pass: ${credentials.password}`);
  if (credentials.username && credentials.password) {
    return res.status(200).send({ credential });
  } else {
    return res.status(400).send({ errMsg: "Credentials invalid or not supplied." });
  }
});

router.get("/genders", (req, res) => {
  return res.status(200).send({
    genders: [
      {
        id: 1,
        name: "Male"
      },
      {
        id: 2,
        name: "Female"
      },
      {
        id: 3,
        name: "Prefer not to say"
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

  if (data.firstName && data.lastName && data.GenderId && data.email && data.StudyFieldId && data.StreamId && data.credential && data.LocationId) {
    return res.status(200).send({
      msg: "Data not successfully uploaded."
    });
  } else {
    return res.status(400).send({
      msg: "Data is missing and was not uploaded."
    });
  }
});

router.get("/studyFields", (req, res) => {
  return res.status(200).send({
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
  return res.status("200").send({
    locations: [
      {
        id: 1,
        name: "Edgehill"
      },
      {
        id: 2,
        name: "Chorley"
      },
      {
        id: 3,
        name: "Newcastle"
      },
      {
        id: 4,
        name: "Lancaster"
      }
    ]
  });
});

router.get("/streams", (req, res) => {
  return res.status("200").send({
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
