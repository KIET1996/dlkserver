CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR(255) UNIQUE NOT NULL,
    role INT NOT NULL
);

CREATE TABLE medicalSpecialty(
    id INT AUTO_INCREMENT PRIMARY KEY,
    namemedicalspecialty VARCHAR(255)
);

CREATE TABLE doctor(
    id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    birthday DATE,
    gender BOOLEAN,
    avatar LONGTEXT, 
    scoreevaluate float,
    associateprofessor VARCHAR(255),
    numberevaluate int,
    idmedicalspecialty INT,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES user(id),
    FOREIGN KEY(idmedicalspecialty) REFERENCES medicalspecialty(id)
);

CREATE TABLE patient(
    id INT,
    name VARCHAR(255),
    birthday DATE,
    address VARCHAR(255),
    profession VARCHAR(255),
    gender BOOLEAN,
    avatar LONGTEXT,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES user(id)
);

CREATE TABLE announcement(
    id INT AUTO_INCREMENT PRIMARY KEY,
    content text,
    datetime DATETIME,
    header VARCHAR(255),
    status int,
    userid int,
    FOREIGN KEY(userid) REFERENCES user(id)
);

CREATE TABLE schedule(
    dateschedule DATE,
    timestart Time,
    timeend Time,
    doctorid int,
    PRIMARY KEY(dateschedule, timestart, timeend, doctorid),
    FOREIGN KEY(doctorid) REFERENCES doctor(id)
);

CREATE TABLE booking(
    datebooking DATE,
    timestart TIME,
    timeend TIME,
    patientid INT,
    doctorid INT,
    timebooking VARCHAR(255),
    status INT,
    PRIMARY KEY(datebooking, timestart, timeend, patientid, doctorid),
    FOREIGN KEY(patientid) REFERENCES patient(id),
    FOREIGN KEY(datebooking, timestart, timeend, doctorid) REFERENCES schedule(dateschedule, timestart, timeend, doctorid)
);
