export const PASSWORD = 'secret_sauce';

export const users = {
    standard: { username: 'standard_user', password: PASSWORD },
    lockedOut: { username: 'locked_out_user', password: PASSWORD },
    problem: { username: 'problem_user', password: PASSWORD },
    performanceGlitch: { username: 'performance_glitch_user', password: PASSWORD },
    error: { username: 'error_user', password: PASSWORD },
    visual: { username: 'visual_user', password: PASSWORD },
};

export const invalidUsers = {
    unknown: { username: 'wrong_user', password: PASSWORD },
    wrongPassword: { username: 'standard_user', password: '123456' },
    capitalisedUsername: { username: 'STANDARD_USER', password: PASSWORD },
    capitalisedPassword: { username: 'standard_user', password: PASSWORD.toUpperCase() },
};
