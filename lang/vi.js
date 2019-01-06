export const transValidation = {
  email_incorrect: "Email phải có dạng example@trungqandev.com!",
  gender_incorrect: "Ủa, tại sao trường giới tính lại bị sai?",
  password_incorrect: "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt.",
  password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác."
};

export const transErrors = {
  account_in_use: "Email này đã được sử dụng.",
  account_removed: "Tài khoản này đã bị gỡ khỏi hệ thống, nếu tin rằng điều này là hiểu nhầm, vui lòng liên hệ lại với bộ phận hỗ trợ của chúng tôi.",
  account_not_active: "Email này đã được đăng ký nhưng chưa active tài khoản, vui lòng kiểm tra email của bạn hoặc liên hệ lại với bộ phận hỗ trợ của chúng tôi."
};

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email của bạn để active tài khoản trước khi đăng nhập. Xin cảm ơn!`;
  }
};
