'use strict';

var config = require('../../config/secrets');

module.exports = function(db, DataTypes) {
  var Patient = db.define('Patient', {
    pid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    fname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    lname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING.BINARY,
      unique: false,
      allowNull: false,
      isIn: [['F', 'M']]
    },
    dob: {
      type: DataTypes.DATE,
      isDate: true,
      unique: false,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      isEmail: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    placeofbirth: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    typeofresidence: {
      type: DataTypes.STRING.BINARY,
      unique: false,
      allowNull: true,
      isIn: [['U', 'R']]
    },
    street: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    job: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    education: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      isIn: [['some school', 'high School', 'some college', 'college',
      'advanced degree']]
    },
    maritalstatus: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      isIn: [['single', 'married', 'union', 'widowed', 'divorced']]
    },
    mothername: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    fathername: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    econtactname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    econtactphone: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    motherstatus: {
      type: DataTypes.STRING.BINARY,
      unique: false,
      allowNull: true,
      isIn: [['A', 'D']]
    },
    fatherstatus: {
      type: DataTypes.STRING.BINARY,
      unique: false,
      allowNull: true,
      isIn: [['A', 'D']]
    },
    patientcond: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    mothercond: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    fathercond: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    }
  }, {
    tableName: 'patients',
    timestamps: false
  });

  return Patient;
};