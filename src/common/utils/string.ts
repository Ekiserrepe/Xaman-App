/**
 * UUID encoding
 */
const UUIDEncoding = {
    toHex: (uuid: string): string => {
        if (uuid.length % 2 !== 0) {
            throw new Error('Must have an even number to convert to bytes');
        }
        const numBytes = uuid.length / 2;
        const byteArray = new Uint8Array(numBytes);
        for (let i = 0; i < numBytes; i++) {
            let byte;
            const byteChar = uuid.substr(i * 2, 2);

            if (byteChar[0] === '-') {
                byte = (parseInt(`0${byteChar[1]}`, 16) * -1) & 0xff;
            } else if (byteChar[1] === '-') {
                byte = parseInt(byteChar[0], 16);
            } else {
                byte = parseInt(byteChar, 16);
            }
            byteArray[i] = byte;
        }

        return Array.from(byteArray, (byte) => {
            return `0${(byte & 0xff).toString(16)}`.slice(-2);
        }).join('');
    },
};

/**
 * Hex encoding/decoding
 */
const HexEncoding = {
    toBinary: (hex: string): Buffer => {
        return hex ? Buffer.from(hex, 'hex') : undefined;
    },

    toString: (hex: string): string | undefined => {
        return hex ? Buffer.from(hex, 'hex').toString('utf8') : undefined;
    },

    toHex: (text: string | number[] | Buffer): string | undefined => {
        return text ? Buffer.from(text).toString('hex') : undefined;
    },

    toUTF8: (hex: string): string | undefined => {
        if (!hex) return undefined;

        const buffer = Buffer.from(hex, 'hex');
        const isValid = Buffer.compare(Buffer.from(buffer.toString(), 'utf8'), buffer) === 0;

        if (isValid) {
            return buffer.toString('utf8');
        }
        return hex;
    },
};

/**
 * Truncate string
 * @param fullString string
 * @param string_length number expected output length
 * @returns stringTruncate text ABC...EFG
 */
const Truncate = (fullString: string, string_length: number): string => {
    if (fullString.length <= string_length) {
        return fullString;
    }

    const separator = '...';

    const separator_length = separator.length;
    const charsToShow = string_length - separator_length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);

    return fullString.substr(0, frontChars) + separator + fullString.substr(fullString.length - backChars);
};

/**
 * Capitalize string
 * @param str string
 * @returns capitalize string test -> Test
 */
const Capitalize = (str: string) => {
    if (!str) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Check string type
 * @param str value in string
 * @returns boolean
 */
const StringTypeCheck = {
    isValidUUID: (input: string): boolean => {
        if (typeof input !== 'string') {
            return false;
        }
        // TODO: fix eslint error
        // eslint-disable-next-line prefer-regex-literals,no-control-regex
        const uuidv4RegExp = new RegExp('^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$', 'i');
        return uuidv4RegExp.test(input);
    },

    isValidURL: (input: string): boolean => {
        if (typeof input !== 'string') {
            return false;
        }
        // TODO: fix eslint error
        // eslint-disable-next-line prefer-regex-literals,no-control-regex
        const urlRegExp = new RegExp('^https://[a-zA-Z0-9][a-zA-Z0-9-.]+[a-zA-Z0-9].[a-zA-Z]{1,}[?/]{0,3}[^\r\n\t]+');
        return urlRegExp.test(input);
    },

    isValidAmount: (input: string): boolean => {
        if (typeof input !== 'string') {
            return false;
        }
        // TODO: fix eslint error
        // eslint-disable-next-line prefer-regex-literals,no-control-regex
        const amountRegExp = new RegExp(/^(?![0.]+$)\d+(\.\d{1,15})?$/gm);
        return amountRegExp.test(input);
    },

    isValidHash: (input: string): boolean => {
        if (typeof input !== 'string') {
            return false;
        }

        // TODO: fix eslint error
        // eslint-disable-next-line prefer-regex-literals,no-control-regex
        const hashRegExp = new RegExp('^[A-F0-9]{64}$', 'i');
        return hashRegExp.test(input);
    },

    isValidXAppIdentifier: (input: string): boolean => {
        if (typeof input !== 'string') {
            return false;
        }

        // TODO: fix eslint error
        // eslint-disable-next-line prefer-regex-literals,no-control-regex
        const identifier = new RegExp('^[A-Z0-9._-]+$', 'i');
        return identifier.test(input);
    },
};

/**
 * Create identifier crc32 from string
 * @param str value in string
 * @returns identifier version of string
 */
const StringIdentifier = (str: String): number => {
    let crc = 0xffffffff;
    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i);
        for (let bit = 0; bit < 8; bit++) {
            if ((crc & 1) !== 0) crc = (crc >>> 1) ^ 0xedb88320;
            else crc >>>= 1;
        }
    }
    return ~crc;
};

/* Export ==================================================================== */
export { HexEncoding, UUIDEncoding, Truncate, Capitalize, StringTypeCheck, StringIdentifier };
