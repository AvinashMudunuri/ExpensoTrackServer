const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  connectTestDB,
  disconnectDB,
} = require('../../infrastructure/database');

const {
  deleteRedisKey,
  disconnectRedis,
} = require('../../infrastructure/redis');

const PaymentMode = require('../../domain/models/paymentMode');
const paymentModeService = require('../../domain/services/paymentModeService');

const expect = chai.expect;
chai.use(chaiHttp);

// Set a longer timeout for all tests
const TEST_TIMEOUT = 10000;
let paymentModeId;

describe('PaymentMode Service', function () {
  this.timeout(TEST_TIMEOUT);

  before(async () => {
    await connectTestDB();
    const pm = await PaymentMode.findOne({ mode_name: 'CASH' });
    if (pm) {
      await deleteRedisKey(`PM::${pm._id}`);
    }
    await PaymentMode.deleteMany({});
  });

  after(async () => {
    await disconnectDB();
    await disconnectRedis();
  });

  describe('Create Payment Mode', () => {
    it('should create new payment mode', async () => {
      const paymentModeData = {
        mode_name: 'CASH',
      };
      const pm = await paymentModeService.createPaymentMode(paymentModeData);
      expect(pm).to.have.property('_id');
      expect(pm.mode_name).to.equal('CASH');
      paymentModeId = pm._id;
    });

    it('should not create user with duplicate mode', async () => {
      const paymentModeData = {
        mode_name: 'CASH',
      };
      try {
        await paymentModeService.createPaymentMode(paymentModeData);
      } catch (ex) {
        expect(ex.message).to.equal('Payment Mode with this already exists');
      }
    });
  });

  describe('getAllPaymentModes', () => {
    it('Should return all users', async () => {
      const pms = await paymentModeService.getAllPaymentModes();
      expect(pms).to.be.an('array');
      expect(pms.length).to.be.greaterThan(0);
    });
  });

  describe('getPaymentModeById', () => {
    it('Should return payment mode', async () => {
      const pm = await paymentModeService.getPaymentModeId(paymentModeId);
      expect(pm).to.have.property('_id');
      expect(pm.mode_name).to.equal('CASH');
    });
    it('Should throw error with invalid id', async () => {
      try {
        await paymentModeService.getPaymentModeId('66851c96bee514225ee6ca86');
      } catch (ex) {
        expect(ex.message).to.equal('Payment mode with this id doesnot exists');
      }
    });
  });

  describe('deletePaymenyModeById', () => {
    it('Should delete payment mode', async () => {
      const result =
        await paymentModeService.deletePaymentModeById(paymentModeId);
      expect(result).to.have.property('_id');
    });
    it('Should throw error with invalid id', async () => {
      try {
        await paymentModeService.deletePaymentModeById(
          '66851c96bee514225ee6ca86'
        );
      } catch (ex) {
        expect(ex.message).to.equal('Payment mode with this id doesnot exists');
      }
    });
  });
});
