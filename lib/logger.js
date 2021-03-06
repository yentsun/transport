import winston from 'winston';
import screenPassword from './screenPassword';


export default function ({ group, level='debug' }) {

    const formatter = function (options) {
        return [options.timestamp(), 'tasu.' + group, options.level.toUpperCase(), options.message || '', options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta) : ''].join(' ')
    };

    return new (winston.Logger)({
        rewriters: [screenPassword],
        transports: [
            new (winston.transports.Console)({
                level,
                timestamp: function () {
                    const now = new Date();
                    return now.toISOString()
                },
                formatter,
                stderrLevels: ['error']
            })
        ]
    });
};
