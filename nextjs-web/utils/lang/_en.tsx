import { IDynamic } from '../../models';

export const en: IDynamic = {
  footer: {
    description: 'IML - DataSoft © 2023 - All Rights Reserved.',
    version: 'Version'
  },
  header: {
    title1: 'IML',
    title2: 'DataSoft',
    mergeTitle: 'IML - DataSoft',
    home: 'Home',
    simulators: 'Data Generator',
    simulatorList: 'Data Generators',
    addDataGenerator: 'Add Data Generator',
    realDataset: 'Real World Dataset',
    algorithms: 'Algorithms',
    algorithmResult: 'ML Model Analysis',
    failureTypes: 'Anomaly Types',
    userSettings: 'User Settings',
    logout: 'Logout',
    changePassword: 'Change Password',
    runAlgorithm: 'ML Model Trainer'
  },
  general: {
    save: 'Save',
    delete: 'Delete',
    cancel: 'Cancel',
    search: 'Search',
    saveChanges: 'Save Changes',
    actions: 'Actions',
    id: 'ID',
    signIn: 'Sign In',
    signUp: 'Sign Up'
  },
  failureTypes: {
    pageTitle: 'Anomaly Types',
    id: 'ID',
    failureName: 'Anomaly Name',
    period: 'Period',
    soundAnomalyMultiplier: 'Sound Anomaly Multiplier',
    temperatureAnomalyMultiplier: 'Temperature Anomaly Multiplier',
    vibrationAnomalyMultiplier: 'Vibration Anomaly Multiplier',
    timeInterval: 'Time Interval',
    addFailureType: 'Add Anomaly Type',
    deleteModal: {
      description: 'The selected Anomaly Type will be deleted. Are you sure?',
      title: 'Delete Anomaly Type',
      successMessage: 'Deletion of Anomaly Type was successful!',
      errorMessage: 'An error occurred while deleting Anomaly Type!'
    },
    addModal: {
      successMessage: 'Anomaly Type added successfully!',
      errorMessage: 'An error occurred while adding Anomaly Type!'
    },
    editModal: {
      successMessage: 'Anomaly Type was successfully updated!',
      errorMessage: 'An error occurred while updating Anomaly Type!'
    }
  },
  simulator: {
    pageTitle: 'Data Generator',
    editSimulator: 'Edit Data Generator',
    addDataGenerator: 'Add Data Generator',
    editDataGenerator: 'Edit Data Generator',
    simulatorName: 'Data Generator Name',
    checkBoxListTitle: 'Anomaly Types',
    generateSimulatorData: 'Generate Data Generator Data',
    editSuccessMessage: 'Generated Data Successfully',
    editErrorMessage: 'Generated Data Errorfully',
    addSuccessMessage: 'Data Generator Added Successfully',
    addErrorMessage: 'Data Generator Added Error',
    result: 'Result',
    parameters: 'Parameters',
    deleteModalTitle: 'Delete Data Generator',
    deleteModalDescription: 'Delete Data Generator Description',
    deleteSuccessMessage: 'Data Generator Delete Successfully',
    deleteErrorMessage: 'Data Generator Delete Error',
    showParameters: 'Show Parameters',
    showResult: 'Show Result',
    simulatorParameters: 'Data Generator Parameters',
    simulatorResult: 'Data Generator Result',
    sound: 'Sound',
    vibration: 'Vibration',
    temperature: 'Temperature',
    tag: 'Tag',
    time: 'Time',
    minExpectedTemperatureValue: 'Min Expected Temperature Value (°C)',
    maxExpectedTemperatureValue: 'Max Expected Temperature Value (°C)',
    minExpectedSoundValue: 'Min Expected Sound Value (dB)',
    maxExpectedSoundValue: 'Max Expected Sound Value (dB)',
    minExpectedVibrationValue: 'Min Expected Vibration Value (m/s²)',
    maxExpectedVibrationValue: 'Max Expected Vibration Value (m/s²)',
    dataCount: 'Number of Data To Be Produced',
    anomalyCount: 'Anomaly Count'
  },
  login: {
    emailAddress: 'Email Address',
    password: 'Password',
    wouldYouLikeToRegister: 'Would you like to register?',
    successMessage: 'Sign In Successfully!',
    errorMessage:
      'There was a problem while signing in. Please check your information!',
    validations: {
      emailAddress: {
        required: 'Enter your email',
        email: 'Enter a valid email'
      },
      password: {
        required: 'Password is required',
        minCharacters: 'Password should be of minimum 8 characters length'
      }
    }
  },
  signUp: {
    emailAddress: 'Email Address',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    alreadyHaveRegister: 'Do you already have a register?',
    successMessage: 'Sign Up Successfully!',
    errorMessage:
      'There was a problem while signing up. Please check your information!',
    validations: {
      firstName: {
        required: 'Enter your first name'
      },
      lastName: {
        required: 'Enter your last name'
      },
      emailAddress: {
        required: 'Enter your email',
        email: 'Enter a valid email'
      },
      password: {
        required: 'Password is required',
        minCharacters: 'Password should be of minimum 8 characters length'
      }
    }
  },
  userSettings: {
    pageTitle: 'User Settings',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    successMessage: 'User information has been successfully updated!',
    errorMessage: 'A problem occurred while updating user information!'
  },
  changePassword: {
    modalTitle: 'Change Password',
    password: 'Password',
    newPassword: 'New Password',
    successMessage: 'Password updated successfully!',
    errorMessage: 'There was a problem updating the password!'
  },
  realDataset: {
    pageTitle: 'Real World Dataset',
    addRealDataset: 'Add Real World Dataset',
    datasetName: 'Dataset Name',
    deleteModal: {
      title: 'Delete Real World Dataset',
      description:
        'The selected Real World Dataset will be deleted. Are you sure you want to continue?',
      successMessage: 'Deletion of Real World Dataset was successful!',
      errorMessage: 'An error occurred while deleting Real World Dataset!'
    },
    uploadFile: 'Upload File',
    addModal: {
      title: 'Add Real World Dataset',
      successMessage: 'Real World Dataset added successfully!',
      errorMessage: 'An error occurred while adding Real World Dataset!'
    },
    editModal: {
      title: 'Edit Real World Dataset',
      successMessage: 'Real World Dataset was successfully updated!',
      errorMessage: 'An error occurred while updating Real World Dataset!'
    }
  },
  algorithms: {
    algorithmName: 'Algorithm Name',
    pageTitle: 'Algorithms',
    addAlgorithm: 'Add Algorithm',
    deleteModal: {
      title: 'Delete Algorithm',
      description:
        'The selected Algorithm will be deleted. Are you sure you want to continue?',
      successMessage: 'Deletion of Algorithm was successful!',
      errorMessage: 'An error occurred while deleting Algorithm!'
    },
    addModal: {
      title: 'Add Algorithm',
      successMessage: 'Algorithm added successfully!',
      errorMessage: 'An error occurred while adding Algorithm!'
    },
    editModal: {
      title: 'Edit Algorithm',
      successMessage: 'Algorithm was successfully updated!',
      errorMessage: 'An error occurred while updating Algorithm!'
    }
  },
  runAlgorithms: {
    pageTitle: 'ML Model Trainer',
    dataset: 'Dataset',
    algortihms: 'Algorithms',
    runAlgorithms: {
      button: 'Traın Model',
      successMessage: 'ML Model Training successfully!',
      errorMessage: 'An error occurred while ML Model Trainer!'
    },
    algorithmSettingName: 'Name',
    sensorTypes: 'Sensor Types'
  },
  algorithmCard: {
    accuracy: 'Accuracy',
    f1: 'F1',
    recall: 'Recall',
    precision: 'Precision'
  },
  compareAlgorithms: {
    pageTitle: 'ML Model Analysis',
    getAlgorithmResults: 'Get Evaluatıon Results',
    algorithm1: 'Algorithm 1',
    algorithm2: 'Algorithm 2'
  }
};
