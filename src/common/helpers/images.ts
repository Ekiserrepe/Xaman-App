import { Platform } from 'react-native';

const buildImageSource = (iosSrc: string, androidSrc: string): { uri: string } => {
    return { uri: Platform.OS === 'ios' ? iosSrc : androidSrc };
};

export const Images = {
    // Backgrounds
    BackgroundPattern: buildImageSource('BackgroundPattern', 'background_pattern'),
    BackgroundPatternLight: buildImageSource('BackgroundPatternLight', 'background_pattern_light'),
    BackgroundShapes: buildImageSource('BackgroundShapes', 'background_shapes'),
    BackgroundShapesLight: buildImageSource('BackgroundShapesLight', 'background_shapes_light'),
    // Visuals
    ImageFirstAccount: buildImageSource('ImageFirstAccount', 'image_first_account'),
    ImageFirstAccountLight: buildImageSource('ImageFirstAccountLight', 'image_first_account_light'),
    ImageNoEvents: buildImageSource('ImageNoEvents', 'image_no_events'),
    ImageNoEventsLight: buildImageSource('ImageNoEventsLight', 'image_no_events_light'),
    ImageProfile: buildImageSource('ImageProfile', 'image_profile'),
    ImageProfileLight: buildImageSource('ImageProfileLight', 'image_profile_light'),
    ImageNoContacts: buildImageSource('ImageNoContacts', 'image_no_contacts'),
    ImageNoContactsLight: buildImageSource('ImageNoContactsLight', 'image_no_contacts_light'),
    ImageAddAccount: buildImageSource('ImageAddAccount', 'image_add_account'),
    ImageAddAccountLight: buildImageSource('ImageAddAccountLight', 'image_add_account_light'),
    ImageNewAccount: buildImageSource('ImageNewAccount', 'image_new_account'),
    ImageNewAccountLight: buildImageSource('ImageNewAccountLight', 'image_new_account_light'),
    ImageSecretWarning: buildImageSource('ImageSecretWarning', 'image_secret_warning'),
    ImageSecretWarningLight: buildImageSource('ImageSecretWarningLight', 'image_secret_warning_light'),
    ImageManageAccounts: buildImageSource('ImageManageAccounts', 'image_manage_accounts'),
    ImageManageAccountsLight: buildImageSource('ImageManageAccountsLight', 'image_manage_accounts_light'),
    ImageSecurityFirst: buildImageSource('ImageSecurityFirst', 'image_security_first'),
    ImageSecurityFirstLight: buildImageSource('ImageSecurityFirstLight', 'image_security_first_light'),
    ImageSendReceive: buildImageSource('ImageSendReceive', 'image_send_receive'),
    ImageSendReceiveLight: buildImageSource('ImageSendReceiveLight', 'image_send_receive_light'),
    ImagePincode: buildImageSource('ImagePincode', 'image_pincode'),
    ImagePincodeLight: buildImageSource('ImagePincodeLight', 'image_pincode_light'),
    ImageBiometric: buildImageSource('ImageBiometric', 'image_biometric'),
    ImageBiometricLight: buildImageSource('ImageBiometricLight', 'image_biometric_light'),
    ImageNotifications: buildImageSource('ImageNotifications', 'image_notifications'),
    ImageNotificationsLight: buildImageSource('ImageNotificationsLight', 'image_notifications_light'),
    ImageComplete: buildImageSource('ImageComplete', 'image_complete'),
    ImageCompleteLight: buildImageSource('ImageCompleteLight', 'image_complete_light'),
    ImageCloudAlert: buildImageSource('ImageCloudAlert', 'image_cloud_alert'),
    ImageCloudAlertLight: buildImageSource('ImageCloudAlertLight', 'image_cloud_alert_light'),
    ImageWarningShield: buildImageSource('ImageWarningShield', 'image_warning_shield'),
    ImageWarningShieldLight: buildImageSource('ImageWarningShieldLight', 'image_warning_shield_light'),
    ImageCoinWallet: buildImageSource('ImageCoinWallet', 'image_coin_wallet'),
    ImageCoinWalletLight: buildImageSource('ImageCoinWalletLight', 'image_coin_wallet_light'),
    ImageUnknownTrustLine: buildImageSource('ImageUnknownTrustLine', 'image_unknown_trustline'),
    ImageUnknownTrustLineLight: buildImageSource('ImageUnknownTrustLineLight', 'image_unknown_trustline_light'),
    ImageUnknownNFT: buildImageSource('ImageUnknownNFT', 'image_unknown_nft'),
    ImageTriangle: buildImageSource('ImageTriangle', 'image_triangle'),
    ImageSuccessCheckMark: buildImageSource('ImageSuccessCheckMark', 'image_success_check_mark'),
    ImageProfilePro: buildImageSource('ImageProfilePro', 'image_profile_pro'),
    ImageEncryptionMigration: buildImageSource('ImageEncryptionMigration', 'image_encryption_migration'),
    ImageBlankNFT: buildImageSource('ImageBlankNFT', 'image_blank_nft'),
    ImageBlankNFTLight: buildImageSource('ImageBlankNFTLight', 'image_blank_nft_light'),
    ImageArrowUp: buildImageSource('ImageArrowUp', 'image_arrow_up'),
    // Xaman
    XamanLogo: buildImageSource('XamanLogo', 'xaman_logo'),
    XamanLogoLight: buildImageSource('XamanLogoLight', 'xaman_logo_light'),
    // Icons
    IconTabBarScan: buildImageSource('IconTabBarScan', 'icon_tabbar_scan'),
    IconTabBarHome: buildImageSource('IconTabBarHome', 'icon_tabbar_home'),
    IconTabBarHomeSelected: buildImageSource('IconTabBarHomeSelected', 'icon_tabbar_home_selected'),
    IconTabBarHomeSelectedLight: buildImageSource('IconTabBarHomeSelectedLight', 'icon_tabbar_home_selected_light'),
    IconTabBarEvents: buildImageSource('IconTabBarEvents', 'icon_tabbar_events'),
    IconTabBarEventsSelected: buildImageSource('IconTabBarEventsSelected', 'icon_tabbar_events_selected'),
    IconTabBarEventsSelectedLight: buildImageSource(
        'IconTabBarEventsSelectedLight',
        'icon_tabbar_events_selected_light',
    ),
    IconTabBarPro: buildImageSource('IconTabBarPro', 'icon_tabbar_pro'),
    IconTabBarProSelected: buildImageSource('IconTabBarProSelected', 'icon_tabbar_pro_selected'),
    IconTabBarProSelectedLight: buildImageSource('IconTabBarProSelectedLight', 'icon_tabbar_pro_selected_light'),

    IconTabBarSettings: buildImageSource('IconTabBarSettings', 'icon_tabbar_settings'),
    IconTabBarSettingsSelected: buildImageSource('IconTabBarSettingsSelected', 'icon_tabbar_settings_selected'),
    IconTabBarSettingsSelectedLight: buildImageSource(
        'IconTabBarSettingsSelectedLight',
        'icon_tabbar_settings_selected_light',
    ),
    IconTabBarActions: buildImageSource('IconTabBarActions', 'icon_tabbar_actions'),
    IconTabBarActionsLight: buildImageSource('IconTabBarActionsLight', 'icon_tabbar_actions_light'),
    IconTabBarXapp: buildImageSource('IconTabBarXapp', 'icon_tabbar_xapp'),
    IconTabBarXappSelected: buildImageSource('IconTabBarXappSelected', 'icon_tabbar_xapp_selected'),
    IconTabBarXappSelectedLight: buildImageSource('IconTabBarXappSelectedLight', 'icon_tabbar_xapp_selected_light'),

    IconLock: buildImageSource('IconLock', 'icon_lock'),
    IconUnlock: buildImageSource('IconUnlock', 'icon_unlock'),
    IconChevronLeft: buildImageSource('IconChevronLeft', 'icon_chevron_left'),
    IconChevronRight: buildImageSource('IconChevronRight', 'icon_chevron_right'),
    IconShield: buildImageSource('IconShield', 'icon_shield'),
    IconBell: buildImageSource('IconBell', 'icon_bell'),
    IconAccount: buildImageSource('IconAccount', 'icon_account'),
    IconEvents: buildImageSource('IconEvents', 'icon_events'),
    IconEdit: buildImageSource('IconEdit', 'icon_edit'),
    IconProfile: buildImageSource('IconProfile', 'icon_profile'),
    IconScan: buildImageSource('IconScan', 'icon_scan'),
    IconSettings: buildImageSource('IconSettings', 'icon_settings'),
    IconPlus: buildImageSource('IconPlus', 'icon_plus'),
    IconMinus: buildImageSource('IconMinus', 'icon_minus'),
    IconMoreHorizontal: buildImageSource('IconMoreHorizontal', 'icon_more_horizontal'),
    IconMoreVertical: buildImageSource('IconMoreVertical', 'icon_more_vertical'),
    IconTrash: buildImageSource('IconTrash', 'icon_trash'),
    IconEye: buildImageSource('IconEye', 'icon_eye'),
    IconEyeOff: buildImageSource('IconEyeOff', 'icon_eye_off'),
    IconCamera: buildImageSource('IconCamera', 'icon_camera'),
    IconFilter: buildImageSource('IconFilter', 'icon_filter'),
    IconSearch: buildImageSource('IconSearch', 'icon_search'),
    IconCornerRightUp: buildImageSource('IconCornerRightUp', 'icon_corner_right_up'),
    IconCornerLeftUp: buildImageSource('IconCornerLeftUp', 'icon_corner_left_up'),
    IconCornerRightDown: buildImageSource('IconCornerRightDown', 'icon_corner_right_down'),
    IconX: buildImageSource('IconX', 'icon_x'),
    IconBook: buildImageSource('IconBook', 'icon_book'),
    IconSmartPhone: buildImageSource('IconSmartPhone', 'icon_smartphone'),
    IconSlider: buildImageSource('IconSlider', 'icon_sliders'),
    IconActivity: buildImageSource('IconActivity', 'icon_activity'),
    IconXrp: buildImageSource('IconXrp', 'icon_xrp'),
    IconXrpSquare: buildImageSource('IconXrpSquare', 'icon_xrp_square'),
    IconShare: buildImageSource('IconShare', 'icon_share'),
    IconCheck: buildImageSource('IconCheck', 'icon_check'),
    IconInfo: buildImageSource('IconInfo', 'icon_info'),
    IconChevronDown: buildImageSource('IconChevronDown', 'icon_chevron_down'),
    IconChevronUp: buildImageSource('IconChevronUp', 'icon_chevron_up'),
    IconClipboard: buildImageSource('IconClipboard', 'icon_clipboard'),
    IconFingerprint: buildImageSource('IconFingerprint', 'icon_fingerprint'),
    IconThumbsUp: buildImageSource('IconThumbsUp', 'icon_thumbs_up'),
    IconLink: buildImageSource('IconLink', 'icon_link'),
    IconExternalLink: buildImageSource('IconExternalLink', 'icon_external_link'),
    IconHelpCircle: buildImageSource('IconHelpCircle', 'icon_help_circle'),
    IconSend: buildImageSource('IconSend', 'icon_send'),
    IconStar: buildImageSource('IconStar', 'icon_star'),
    IconTrustLine: buildImageSource('IconTrustLine', 'icon_trustline'),
    IconRefresh: buildImageSource('IconRefresh', 'icon_refresh'),
    IconRepeat: buildImageSource('IconRepeat', 'icon_repeat'),
    IconKey: buildImageSource('IconKey', 'icon_key'),
    IconSwitchAccount: buildImageSource('IconSwitchAccount', 'icon_switchaccount'),
    IconGlobe: buildImageSource('IconGlobe', 'icon_globe'),
    IconArrowDown: buildImageSource('IconArrowDown', 'icon_arrow_down'),
    IconFileText: buildImageSource('IconFileText', 'icon_file_text'),
    IconQR: buildImageSource('IconQR', 'icon_qr'),
    IconArrowRightLong: buildImageSource('IconArrowRightLong', 'icon_arrow_right_long'),
    IconCheckXaman: buildImageSource('IconCheckXaman', 'icon_check_xaman'),
    IconApps: buildImageSource('IconApps', 'icon_apps'),
    IconReorder: buildImageSource('IconReorder', 'icon_reorder'),
    IconReorderHandle: buildImageSource('IconReorderHandle', 'icon_reorder_handle'),
    IconXApps: buildImageSource('IconXApps', 'icon_xapps'),
    IconXAppsLight: buildImageSource('IconXAppsLight', 'icon_xapps_light'),
    IconXApp: buildImageSource('IconXApp', 'icon_xapp'),
    IconAlertTriangle: buildImageSource('IconAlertTriangle', 'icon_alert_triangle'),
    IconSortTop: buildImageSource('IconSortTop', 'icon_sort_top'),
    IconStarFull: buildImageSource('IconStarFull', 'icon_star_full'),
    IconHideZero: buildImageSource('IconHideZero', 'icon_hide_zero'),
    IconShowZero: buildImageSource('IconShowZero', 'icon_show_zero'),
    IconPro: buildImageSource('IconPro', 'icon_pro'),
    IconCoins: buildImageSource('IconCoins', 'icon_coins'),
    IconWallet: buildImageSource('IconWallet', 'icon_wallet'),
    IconToggleRight: buildImageSource('IconToggleRight', 'icon_toggle_right'),
    IconCopy: buildImageSource('IconCopy', 'icon_copy'),
    IconRadio: buildImageSource('IconRadio', 'icon_radio'),
    IconFlaskConical: buildImageSource('IconFlaskConical', 'icon_flask_conical'),
};
