import testComponentHelper from 'test/helpers/testComponentHelper.js';
import { login } from 'src/services/authentication';
import LocalAuth from 'src/components/common/LocalAuth';
import LocalLogin from '../LocalLogin';

jest.mock('../../../../services/authentication', () => ({
  login: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ token: '1234' });
      }),
  ),
}));

describe('<LocalLogin/>', () => {
  const renderComponent = testComponentHelper(LocalLogin);

  describe('@renders', () => {
    it('should render initial state', () => {
      const { wrapper } = renderComponent();
      expect(wrapper.find(LocalAuth).length).toBe(1);
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
      it('should call login from auth and trigger inComplete cb', done => {
        const { wrapper } = renderComponent({
          onComplete: onCompleteMock,
        });
        expect(login).not.toHaveBeenCalled();
        wrapper
          .find(LocalAuth)
          .props()
          .onSubmit(data);
        expect(login).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledWith(data);
        setImmediate(() => {
          expect(onCompleteMock).toHaveBeenCalledTimes(1);
          expect(onCompleteMock).toHaveBeenCalledWith('1234');
          done();
        });
      });
      it('should set error when unsuccessful login', () => {
        const { wrapper } = renderComponent({
          onComplete: onCompleteMock,
        });
        const errorMock = { code: 2, message: 'errorMessage' };
        login.mockImplementationOnce(
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
