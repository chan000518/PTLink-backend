const { object, string, enums, refine, size, partial } = require('superstruct');

// 이메일 형식 검증
const Email = refine(string(), 'Email', (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Invalid email format. Example: user@example.com';
});

// 비밀번호 규칙: 8자 이상, 하나 이상의 영어와 숫자 포함
const Password = refine(string(), 'Password', (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return (
        passwordRegex.test(value) ||
        'Password must be at least 8 characters long, include at least one letter and one number.'
    );
});

// User 데이터 검증 스키마
const UserSchema = object({
    username: size(string(), 3, 20), // 사용자 이름: 3~20자
    email: Email, // 이메일 형식 검증
    password: Password, // 비밀번호 규칙 검증
    name: size(string(), 1, 50), // 이름은 최소 1자, 최대 50자
    role: enums(['TRAINER', 'MEMBER']), // 역할: TRAINER 또는 MEMBER
});

createUserStruct = UserSchema;
updateUserStruct = partial(UserSchema);

module.exports = { createUserStruct,updateUserStruct };