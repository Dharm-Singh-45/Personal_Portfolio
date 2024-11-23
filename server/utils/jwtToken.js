

export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      expires:new Date(Date.now() + 1000 * 60 * 60 * 24),
    
      httpOnly: true,
      secure: true,
      sameSite:"None",
      // domain:process.env.DASHBOARD_URL
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
