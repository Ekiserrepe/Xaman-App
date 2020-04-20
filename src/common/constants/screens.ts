/**
 * Global App Screens
 */

const screens = {
    Onboarding: 'app.Onboarding',
    Setup: {
        Passcode: 'app.Setup.Passcode',
        Biometric: 'app.Setup.Biometric',
        Permissions: 'app.Setup.Permissions',
        Agreement: 'app.Setup.Agreement',
        Finish: 'app.Setup.Finish',
    },
    TabBar: {
        Home: 'app.TabBar.Home',
        Events: 'app.TabBar.Events',
        Scan: 'app.TabBar.Scan',
        Profile: 'app.TabBar.Profile',
        Settings: 'app.TabBar.Settings',
    },
    Account: {
        Add: 'app.Account.Add',
        Generate: 'app.Account.Generate',
        Import: 'app.Account.Import',
        List: 'app.Account.List',
        Edit: {
            Settings: 'app.Account.Settings',
            ChangePassphrase: 'app.Account.ChangePassphrase',
        },
    },
    Modal: {
        HomeSettings: 'modal.HomeSettings',
        ReviewTransaction: 'modal.ReviewTransaction',
        FilterEvents: 'modal.FilterEvents',
        Scan: 'modal.Scan',
        Submit: 'modal.Submit',
        Picker: 'modal.Picker',
        Help: 'modal.Help',
    },
    Overlay: {
        SwitchAccount: 'overlay.SwitchAccount',
        AddCurrency: 'overlay.AddCurrency',
        Vault: 'overlay.Vault',
        Auth: 'overlay.Auth',
        Lock: 'overlay.lock',
        CurrencySettings: 'overlay.CurrencySettings',
        Alert: 'overlay.Alert',
        ShareAccount: 'overlay.ShareAccount',
        RequestDecline: 'overlay.RequestDecline',
        EnterDestinationTag: 'overlay.EnterDestinationTag',
    },
    Transaction: {
        Payment: 'app.Transaction.Payment',
        Details: 'app.Transaction.Details',
        Exchange: 'app.Transaction.Exchange',
    },
    Settings: {
        AddressBook: {
            List: 'app.Settings.AddressBook.List',
            Add: 'app.Settings.AddressBook.Add',
            Edit: 'app.Settings.AddressBook.Edit',
        },
        Node: {
            List: 'app.Settings.Node.List',
        },
        SessionLog: 'app.Settings.SessionLog',
        General: 'app.Settings.General',
        Advanced: 'app.Settings.Advanced',
        Security: 'app.Settings.Security',
        ChangePasscode: 'app.Settings.Security.ChangePasscode',
        TermOfUse: 'app.Settings.TermOfUse',
        Credits: 'app.Settings.Credits',
    },
    Placeholder: 'app.Placeholder',
};

export default screens;
