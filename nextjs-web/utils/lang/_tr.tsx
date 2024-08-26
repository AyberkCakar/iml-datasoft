import { IDynamic } from '../../models';

export const tr: IDynamic = {
  footer: {
    description: 'IML - DataSoft © 2023 - Tüm Hakları Saklıdır.',
    version: 'Versiyon'
  },
  header: {
    title1: 'IML',
    title2: 'DataSoft',
    mergeTitle: 'IML - DataSoft',
    home: 'Ana Sayfa',
    simulators: 'Veri Oluşturucu',
    addDataGenerator: 'Veri Oluşturucu Ekle',
    realDataset: 'Gerçek Dünya Veri Seti',
    algorithms: 'Algoritmalar',
    algorithmResult: 'Evolüsyon Sonuçları',
    failureTypes: 'Anomali Tipleri',
    userSettings: 'Kullanıcı Ayarları',
    logout: 'Çıkış Yap',
    changePassword: 'Şifre Değiştir',
    runAlgorithm: 'Veri Analizcisi'
  },
  general: {
    save: 'Kaydet',
    delete: 'Sil',
    cancel: 'İptal',
    search: 'Ara',
    saveChanges: 'Değişiklikleri Kaydet',
    actions: 'Eylemler',
    id: 'ID',
    signIn: 'Giriş Yap',
    signUp: 'Kayıt Ol'
  },
  failureTypes: {
    pageTitle: 'Anomali Tipleri',
    id: 'ID',
    failureName: 'Anomali Adı',
    period: 'Periyot',
    soundAnomalyMultiplier: 'Ses Anomali Çarpanı',
    temperatureAnomalyMultiplier: 'Sıcaklık Anomali Çarpanı',
    vibrationAnomalyMultiplier: 'Titreşim Anomali Çarpanı',
    timeInterval: 'Zaman Aralığı',
    addFailureType: 'Anomali Tipi Ekle',
    deleteModal: {
      description: 'Seçilen Anomali Tipi silinecek. Emin misiniz?',
      title: 'Anomali Tipi Sil',
      successMessage: 'Anomali Tipi başarıyla silindi!',
      errorMessage: 'Anomali Tipi silinirken bir hata oluştu!'
    },
    addModal: {
      successMessage: 'Anomali Tipi başarıyla eklendi!',
      errorMessage: 'Anomali Tipi eklenirken bir hata oluştu!'
    },
    editModal: {
      successMessage: 'Anomali Tipi başarıyla güncellendi!',
      errorMessage: 'Anomali Tipi güncellenirken bir hata oluştu!'
    }
  },
  simulator: {
    pageTitle: 'Veri Oluşturucu',
    addDataGenerator: 'Veri Oluşturucu Ekle',
    editDataGenerator: 'Veri Oluşturucu Düzenle',
    simulatorName: 'Veri Oluşturucu Adı',
    checkBoxListTitle: 'Anomali Tipleri',
    generateSimulatorData: 'Veri Oluşturucu Verisi Oluştur',
    editSuccessMessage: 'Veri Oluşturucu Başarıyla Düzenlendi',
    editErrorMessage: 'Veri Oluşturucu Düzenlenirken Hata Oluştu',
    addSuccessMessage: 'Veri Oluşturucu Başarıyla Eklendi',
    addErrorMessage: 'Veri Oluşturucu Eklenirken Hata Oluştu',
    result: 'Sonuç',
    parameters: 'Parametreler',
    deleteModalTitle: 'Veri Oluşturucu Sil',
    deleteModalDescription: 'Veri Oluşturucu Silme Açıklaması',
    deleteSuccessMessage: 'Veri Oluşturucu Başarıyla Silindi',
    deleteErrorMessage: 'Veri Oluşturucu Silinirken Hata Oluştu',
    showParameters: 'Parametreleri Göster',
    showResult: 'Sonucu Göster',
    simulatorParameters: 'Veri Oluşturucu Parametreleri',
    simulatorResult: 'Veri Oluşturucu Sonucu',
    sound: 'Ses',
    vibration: 'Titreşim',
    temperature: 'Sıcaklık',
    tag: 'Etiket',
    time: 'Zaman',
    minExpectedTemperatureValue: 'Beklenen Min. Sıcaklık Değeri',
    maxExpectedTemperatureValue: 'Beklenen Maks. Sıcaklık Değeri',
    minExpectedSoundValue: 'Beklenen Min. Ses Değeri',
    maxExpectedSoundValue: 'Beklenen Maks. Ses Değeri',
    minExpectedVibrationValue: 'Beklenen Min. Titreşim Değeri',
    maxExpectedVibrationValue: 'Beklenen Maks. Titreşim Değeri'
  },
  login: {
    emailAddress: 'E-posta Adresi',
    password: 'Şifre',
    wouldYouLikeToRegister: 'Kayıt olmak ister misiniz?',
    successMessage: 'Başarıyla Giriş Yapıldı!',
    errorMessage:
      'Giriş yapılırken bir sorun oluştu. Lütfen bilgilerinizi kontrol edin!',
    validations: {
      emailAddress: {
        required: 'E-postanızı girin',
        email: 'Geçerli bir e-posta girin'
      },
      password: {
        required: 'Parola gerekli',
        minCharacters: 'Parola en az 8 karakter uzunluğunda olmalıdır'
      }
    }
  },
  signUp: {
    emailAddress: 'E-posta Adresi',
    password: 'Şifre',
    firstName: 'İsim',
    lastName: 'Soyisim',
    alreadyHaveRegister: 'Zaten bir kaydınız var mı?',
    successMessage: 'Başarıyla Kayıt Olundu!',
    errorMessage:
      'Kayıt olunurken bir sorun oluştu. Lütfen bilgilerinizi kontrol edin!',
      validations: {
        firstName: {
          required: 'Adınızı girin',
        },
        lastName: {
          required: 'Soyadınızı girin',
        },
        emailAddress: {
          required: 'E-postanızı girin',
          email: 'Geçerli bir e-posta girin'
        },
        password: {
          required: 'Parola gerekli',
          minCharacters: 'Parola en az 8 karakter uzunluğunda olmalıdır'
        }
      }
  },
  userSettings: {
    pageTitle: 'Kullanıcı Ayarları',
    firstName: 'İsim',
    lastName: 'Soyisim',
    emailAddress: 'E-posta Adresi',
    successMessage: 'Kullanıcı bilgileri başarıyla güncellendi!',
    errorMessage: 'Kullanıcı bilgileri güncellenirken bir sorun oluştu!'
  },
  changePassword: {
    modalTitle: 'Şifre Değiştir',
    password: 'Şifre',
    newPassword: 'Yeni Şifre',
    successMessage: 'Şifre başarıyla güncellendi!',
    errorMessage: 'Şifre güncellenirken bir sorun oluştu!'
  },
  realDataset: {
    pageTitle: 'Gerçek Dünya Veri Seti',
    datasetName: 'Veri Seti Adı',
    addRealDataset: 'Gerçek Dünya Veri Seti Ekle',
    deleteModal: {
      title: 'Gerçek Dünya Veri Seti Sil',
      description:
        'Seçilen Gerçek Dünya Veri Seti silinecek. Devam etmek istediğinize emin misiniz?',
      successMessage: 'Gerçek Dünya Veri Seti başarıyla silindi!',
      errorMessage: 'Gerçek Dünya Veri Seti silinirken bir hata oluştu!'
    },
    uploadFile: 'Dosya Yükle',
    addModal: {
      title: 'Gerçek Dünya Veri Seti Ekle',
      successMessage: 'Gerçek Dünya Veri Seti başarıyla eklendi!',
      errorMessage: 'Gerçek Dünya Veri Seti eklenirken bir hata oluştu!'
    },
    editModal: {
      title: 'Gerçek Dünya Veri Seti Düzenle',
      successMessage: 'Gerçek Dünya Veri Seti başarıyla güncellendi!',
      errorMessage: 'Gerçek Dünya Veri Seti güncellenirken bir hata oluştu!'
    }
  },
  algorithms: {
    algorithmName: 'Algoritma Adı',
    pageTitle: 'Algoritmalar',
    addAlgorithm: 'Algoritma Ekle',
    deleteModal: {
      title: 'Algoritma Sil',
      description:
        'Seçilen Algoritma silinecek. Devam etmek istediğinize emin misiniz?',
      successMessage: 'Algoritma başarıyla silindi!',
      errorMessage: 'Algoritma silinirken bir hata oluştu!'
    },
    addModal: {
      title: 'Algoritma Ekle',
      successMessage: 'Algoritma başarıyla eklendi!',
      errorMessage: 'Algoritma eklenirken bir hata oluştu!'
    },
    editModal: {
      title: 'Algoritma Düzenle',
      successMessage: 'Algoritma başarıyla güncellendi!',
      errorMessage: 'Algoritma güncellenirken bir hata oluştu!'
    }
  },
  runAlgorithms: {
    pageTitle: 'Veri Analizcisi',
    dataset: 'Veri Seti',
    algorithms: 'Algoritmalar',
    runAlgorithms: {
      button: 'Veri Analizcisini Çalıştır',
      successMessage: 'Veri Analizcisi başarıyla çalıştırıldı!',
      errorMessage: 'Veri Analizcisini çalıştırırken bir hata oluştu!'
    },
    algorithmSettingName: 'Veri Analizcisi Adı',
    sensorTypes: 'Sensör Tipleri'
  },
  algorithmCard: {
    accuracy: 'Doğruluk',
    f1: 'F1',
    recall: 'Gerçallama',
    precision: 'Kesinlik'
  },
  compareAlgorithms: {
    pageTitle: 'Evolüsyon Sonuçları',
    getAlgorithmResults: 'Evolüsyon Sonuçlarını Al',
    algorithm1: 'Algoritma 1',
    algorithm2: 'Algoritma 2'
  }
};
