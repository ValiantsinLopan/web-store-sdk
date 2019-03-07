import testComponentHelper from 'test/helpers/testComponentHelper.js';
import { register } from 'src/services/authentication';
import LocalAuth from 'src/components/common/LocalAuth';
import LocalRegister from '../LocalRegister';

jest.mock('../../../../services/authentication', () => ({
  register: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ token: '1234' });
      }),
  ),
}));

describe('<LocalRegister/>', () => {
  const renderComponent = testComponentHelper(LocalRegister);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.find(LocalAuth).length).toBe(1);
      // DEACTIVATED FOR NOW
      // expect(wrapper.find(LocalAuth).props().isPassValideted).toBe(true);
    });
  });
  describe('@events', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    describe('onSumbit triggered', () => {
      const onCompleteMock = jest.fn();
      const data = {
        email: 'john@example.com',
        password: 'testtest',
      };
      it('should call register from auth and trigger inComplete cb', done => {
        const { wrapper } = renderComponent({
          onComplete: onCompleteMock,
        });
        expect(register).not.toHaveBeenCalled();
        wrapper
          .find(LocalAuth)
          .props()
          .onSubmit(data);
        expect(register).toHaveBeenCalledTimes(1);
        expect(register).toHaveBeenCalledWith(data);
        setImmediate(() => {
          expect(onCompleteMock).toHaveBeenCalledTimes(1);
<<<<<<< HEAD
          expect(onCompleteMock).toHaveBeenCalledWith('1234');
=======
          expect(onCompleteMock).toHaveBeenCalledWith('1234', data.email);
>>>>>>> release
          done();
        });
      });
      it('should set error when unsuccessful register', () => {
        const { wrapper } = renderComponent({
          onComplete: onCompleteMock,
        });
        const errorMock = { code: 2, message: 'errorMessage' };
        register.mockImplementationOnce(
          () =>
            new Promise((resolve, reject) => {
              reject(errorMock);
            }),
        );
        wrapper
          .find(LocalAuth)
          .props()
          .onSubmit(data)
          .then(result => {
            expect(onCompleteMock).not.toHaveBeenCalled();
            expect(result).toEqual(errorMock);
          });
      });
    });
  });
});
