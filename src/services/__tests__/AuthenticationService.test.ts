import AppService, { AppStateStatus } from '../AppService';
import BackendService from '../BackendService';
import LinkingService from '../LinkingService';
import NavigationService, { RootType } from '../NavigationService';
import PushNotificationsService from '../PushNotificationsService';
import AuthenticationService from '../AuthenticationService';

describe('AuthenticationService', () => {
    const authenticationService = AuthenticationService;
    const appService = AppService;

    it('should properly initialize', async () => {
        const spy1 = jest.spyOn(AppService, 'addListener');
        const spy2 = jest.spyOn(AppService, 'removeListener');

        // initialize the service
        await authenticationService.initialize();

        // fake the setRoot command
        NavigationService.emit('setRoot', RootType.OnboardingRoot);
        expect(spy2).toBeCalledWith('appStateChange', AuthenticationService.onAppStateChange);

        // fake the setRoot command
        NavigationService.emit('setRoot', RootType.DefaultRoot);
        expect(spy1).toBeCalledWith('appStateChange', AuthenticationService.onAppStateChange);
    });

    it('should check for lock when coming from inactive/background state', async () => {
        const spy = jest.spyOn(authenticationService, 'checkLockScreen').mockImplementation(jest.fn());

        appService.prevAppState = AppStateStatus.Background;
        appService.currentAppState = AppStateStatus.Active;
        appService.emit('appStateChange', appService.currentAppState, appService.prevAppState);
        expect(spy).toBeCalled();

        spy.mockClear();

        appService.prevAppState = AppStateStatus.Inactive;
        appService.currentAppState = AppStateStatus.Active;
        appService.emit('appStateChange', appService.currentAppState, appService.prevAppState);
        expect(spy).toBeCalled();
        spy.mockRestore();
    });

    it('should check for lock when going to inactive/background state', async () => {
        const spy = jest.spyOn(authenticationService, 'checkLockScreen').mockImplementation(jest.fn());

        appService.prevAppState = AppStateStatus.Active;
        appService.currentAppState = AppStateStatus.Background;
        appService.emit('appStateChange', appService.currentAppState, appService.prevAppState);
        expect(spy).toBeCalled();

        spy.mockClear();

        appService.prevAppState = AppStateStatus.Active;
        appService.currentAppState = AppStateStatus.Inactive;
        appService.emit('appStateChange', appService.currentAppState, appService.prevAppState);
        expect(spy).toBeCalled();
        spy.mockRestore();
    });

    it('should run the required functions after success auth', async () => {
        jest.useFakeTimers();

        const promiseFn = () => Promise.resolve();
        const spyList = [
            jest.spyOn(AppService, 'checkVersionChange').mockImplementationOnce(promiseFn),
            jest.spyOn(AppService, 'checkAppUpdate').mockImplementationOnce(promiseFn),
            jest.spyOn(BackendService, 'ping').mockImplementationOnce(promiseFn),
            jest.spyOn(LinkingService, 'checkInitialDeepLink').mockImplementationOnce(promiseFn),
            jest.spyOn(PushNotificationsService, 'checkInitialNotification').mockImplementationOnce(promiseFn),
        ];

        // call the method
        AuthenticationService.runAfterSuccessAuth();

        setTimeout(() => {
            for (let i = 0; i < spyList.length; i++) {
                expect(spyList[i]).toBeCalledTimes(1);
            }

            // should clear post success array so won't be run in next success auth
            // @ts-ignore
            expect(authenticationService.postSuccess).toBe([]);
        }, 1000);
    });
});
