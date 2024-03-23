import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/**
 POST: http://localhost:7000/api/v1/users/signup
 {
    userName: username,
    email: user4@user.com,
    password: Tread@1234,
    fullName: fullName
    avatar: upload_img
}
*/

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password } = req.body;

  // Check weather the fields are empty or not
  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Required all fields.");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exist!");
  }

  // console.log(req.files);
  // avatar: [
  //   {
  //     fieldname: 'avatar',
  //     originalname: 'image.png',
  //     encoding: '7bit',
  //     mimetype: 'image/png',
  //     destination: './public/temp/',
  //     filename: 'avatar-1703507104074-57664572',
  //     path: 'public/temp/avatar-1703507104074-57664572',
  //     size: 321374
  //   }
  // ],
  // Optimized Way Of handling Images if Undefine
  // const avatarLocalPath = getLocalPath(req.files, 'avatar');
  // const coverImageLocalPath = getLocalPath(req.files, 'coverImage');

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, 'Avatar is required!');
  // }

  // const avatarImageUpload = await uploadOnCloudinary(avatarLocalPath);
  // const coverImageUpload = await uploadOnCloudinary(coverImageLocalPath);

  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files?.avatar[0]?.path;
  }

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required!");
  }

  const avatarImageUpload = await uploadOnCloudinary(avatarLocalPath);
  const coverImageUpload = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarImageUpload) {
    throw new ApiError(400, "Avatar is not uploaded!");
  }

  const createNewUser = await User.create({
    fullName,
    avatar: avatarImageUpload.url,
    coverImage: coverImageUpload?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  const checkNewUser = await User.findById(createNewUser?._id).select(
    "-password -refreshToken"
  );

  if (!checkNewUser) {
    throw new ApiError(500, "Problem with creating user!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, checkNewUser, "User created successfully."));
});

export { registerUser };
