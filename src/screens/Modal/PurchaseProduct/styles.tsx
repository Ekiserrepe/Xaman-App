import StyleService from '@services/StyleService';

import { AppFonts, AppSizes } from '@theme';

/* Styles ==================================================================== */
const styles = StyleService.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        marginTop: 0,
        backgroundColor: 'transparent',
    },
    backgroundImageStyle: {
        alignSelf: 'flex-start',
        resizeMode: 'repeat',
        tintColor: '$tint',
        opacity: 1,
    },
    actionContainer: {
        backgroundColor: StyleService.select({ light: '$white', dark: '$tint' }),
        borderRadius: AppSizes.borderRadius,
        padding: AppSizes.paddingSml,
        marginTop: AppSizes.padding,
    },
    productDescriptionText: {
        fontFamily: AppFonts.h4.family,
        fontSize: AppFonts.h4.size,
        textAlign: 'center',
        color: '$textPrimary',
        fontWeight: '900',
        paddingTop: AppSizes.padding,
        paddingBottom: AppSizes.paddingExtraSml,
    },
    notesText: {
        fontFamily: AppFonts.small.family,
        fontSize: AppFonts.small.size,
        textAlign: 'center',
        color: '$grey',
    },
    prePurchaseText: {
        fontFamily: AppFonts.base.family,
        fontSize: AppFonts.subtext.size,
        textAlign: 'center',
        color: '$textPrimary',
    },
    successPurchaseText: {
        fontFamily: AppFonts.base.familyExtraBold,
        fontSize: AppFonts.h3.size,
        textAlign: 'center',
        color: '$textPrimary',
    },
    successPurchaseSubtext: {
        fontFamily: AppFonts.base.family,
        fontSize: AppFonts.base.size,
        textAlign: 'center',
        color: '$textSecondary',
    },
    emojiIcon: {
        fontSize: AppFonts.h1.size * 2,
    },
    countDownText: {
        fontFamily: AppFonts.base.family,
        fontSize: AppFonts.base.size * 0.7,
        textAlign: 'center',
        color: '$textSecondary',
    },
    separatorContainer: {
        width: '50%',
        marginTop: AppSizes.paddingSml,
        borderTopColor: '$textSecondary',
        borderTopWidth: 1.5,
        alignSelf: 'center',
    },
    separatorText: {
        textAlign: 'center',
        marginTop: -10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        backgroundColor: StyleService.select({ light: '$white', dark: '$tint' }),
        color: '$textSecondary',
        fontFamily: AppFonts.base.familyBold,
    },
    restorePurchase: {
        color: '$textSecondary',
        fontFamily: AppFonts.base.family,
        fontSize: AppFonts.small.size,
        textDecorationLine: 'underline',
    },
    appIcon: {
        width: AppSizes.scale(60),
        height: AppSizes.scale(60),
        borderRadius: AppSizes.scale(75) / 4,
    },
    checkMarkImage: {
        tintColor: '$green',
        alignSelf: 'center',
    },
});

export default styles;
