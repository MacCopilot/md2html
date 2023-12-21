interface MenuStruct {
  title: string;
  href: string;
  isdir: boolean;
  sublayouts: Array<MenuStruct>;
  markdown_id: number;
}
interface SubMenuProps {
  prefix: string;
  menus: Array<MenuStruct>;
  layer: number;
  offset: number;
  SideBarIndex: number;
  setSideBarIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface MearmaidPara {
  graphDefinition: string | undefined;
}
interface CreateRepoProps {
  user_id: number;
  DataMutation: boolean;
  setDataMutation: React.Dispatch<React.SetStateAction<boolean>>;
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface DeleteRepoProps {
  repo_id: number;
  DataMutation: boolean;
  setDataMutation: React.Dispatch<React.SetStateAction<boolean>>;
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UpdateRepoProps {
  repo_id: number;
  DataMutation: boolean;
  setDataMutation: React.Dispatch<React.SetStateAction<boolean>>;
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProfileProps {
  user_id: number;
  dataType: DataType;
  setDataType: React.Dispatch<React.SetStateAction<DataType>>;
}
interface UpdateUserProps {
  user_id: number;
  DataMutation: boolean;
  setDataMutation: React.Dispatch<React.SetStateAction<boolean>>;
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface UploadProfileProps {
  user_id: number;
  DataMutation: boolean;
  setDataMutation: React.Dispatch<React.SetStateAction<boolean>>;
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SideBarProps {
  user_id: number;
  sidebar_type: string;
  repo_id: number;
  layout: Array<MenuStruct>;
  SideBarIndex: number;
  setSideBarIndex: React.Dispatch<React.SetStateAction<number>>;
  useSearch: boolean;
  setUseSearch: React.Dispatch<React.SetStateAction<boolean>>;
  OpenUpdateRepo: boolean;
  setOpenUpdateRepo: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NavBarProps {
  navbar_type: string;
  NavBarOpen: boolean;
  setNavBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  useSearch: boolean;
  setUseSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

interface createUserPara {
  username: string;
  password: string;
  email: string;
}

interface getRepoPara {
  repo_id: number;
}
interface downloadFilePara {
  user_id: number;
}
interface getPublicRepoPara {
  repo_id: number;
}
interface getMarkdownPara {
  repo_id: number;
  mdhref: string;
}

interface listUserRepoPara {
  user_id: number;
  page_id: number;
  page_size: number;
}
interface listUserVisiblePostPara {
  user_id: number;
  page_id: number;
  page_size: number;
}
interface pullRepoPara {
  repo_id: number;
}
interface deleteRepoPara {
  repo_id: number;
}
interface verifyCodePara {
  email: string;
}
interface updateRepoPara {
  repo_id: number;
  repo_name: string | undefined;
  repo_git: string | undefined;
  repo_access_type: string | undefined;
  repo_user_name: string | undefined;
  repo_access_token: string | undefined;
  repo_from: string | undefined;
  repo_describe: string | undefined;
  visible: string | undefined;
}

interface repoPara {
  repo_id: number;
  repo_name: string;
  repo_git: string;
  repo_access_type: string;
  repo_user_name: string;
  repo_access_token: string;
  repo_from: string;
  repo_describe: string;
  visible: string;
  created_at: string;
  user_id: number;
}

interface createRepoPara {
  user_id: number;
  repo_name: string;
  repo_git: string;
  repo_access_type: string;
  repo_user_name: string;
  repo_access_token: string;
  repo_from: string;
  repo_describe: string;
  visible: string;
}

interface CreatePostProps {
  DataMutation: boolean;
  setDataMutation: React.Dispatch<React.SetStateAction<boolean>>;
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface File {
  file_path: string;
  data: string;
}
interface uploadProfilePara {
  user_id: number;
  image_string: string;
}
interface updateUserPara {
  user_id: number;
  motto: string;
  password: string;
  image_string: string;
  visible: boolean;
}

interface queryRepoMarkdownPara {
  user_id: number;
  repo_id: number;
  plain_to_tsquery: string;
}
interface queryUserMarkdownPara {
  user_id: number;
  plain_to_tsquery: string;
}

interface Markdown {
  markdown_id: number;
  mdhref: string;
  mdtext: string;
  repo_id: number;
  user_id: number;
}

interface Session {
  session_id: string;
  user_id: number;
  refresh_token: string;
  user_agent: string;
  client_ip: string;
  available: string;
  expires_at: string;
  created_at: string;
}
interface listUserPara {
  page_id: number;
  page_size: number;
}
interface listSessionPara {
  page_id: number;
  page_size: number;
}

interface listActiveSessionPara {
  page_id: number;
  page_size: number;
}
interface banUserPara {
  user_id: number;
  available: number;
}
interface banSessionrPara {
  session_id: string;
  available: string;
}

interface loginUserPara {
  email: string;
  password: string;
}

interface Comment {
  comment_id: number;
  post_id: number;
  user_id: number;
  username: string;
  parent_id: number;
  comment_content: string;
  image_string: string;
  created_at: string;
  children: Comment[];
  puser_id: number;
  pusername: string;
}
interface OComment {
  id: string;
  userAvatar: string;
  userName: string;
  timestamp: string;
  text: string;
  replies?: Comment[];
}

interface SessionTableProps {
  sessionlist: Array<Session>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  DataMutationSession: boolean;
  setDataMutationSession: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

interface UserListProps {
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface refreshTokenPara {
  refresh_token: string;
}
interface resetPasswordPara {
  email: string;
  secret_code: string;
  verify_id: string;
  password: string;
}

interface countUserPostPara {
  user_id: number;
}
interface Post {
  post_id: number;
  user_id: number;
  image_string: string;
  post_title: string;
  visible: string;
  created_at: string;
  count_likes: number;
  count_dislikes: number;
  count_comments: number;
  count_shares: number;
  username: string;
  user_image_string: string;
  user_email: string;
}
interface PostInfo {
  post_id: number;
  user_id: number;
  image_string: string;
  post_title: string;
  visible: string;
  created_at: string;
  count_likes: number;
  count_dislikes: number;
  count_comments: number;
  count_shares: number;
  username: string;
  user_image_string: string;
  user_email: string;
}
interface getPostPara {
  post_id: number;
}
interface UserInfo {
  user_id: number;
  username: string;
  email: string;
  image_string: string;
}
interface countUserInfoPara {
  user_id: number;
}
interface PostListPara {
  user_id: number;
  type: string;
}
interface RepoListPara {
  user_id: number;
}
interface UserListPara {
  user_id: number;
  type: string;
}
interface LikeListPara {
  user_id: number;
}
interface queryPostPara {
  plain_to_tsquery: string;
}
interface queryUserPara {
  plain_to_tsquery: string;
}
type ErrorType = "UserNotFound" | "SessionExpired";
type CommentType = "MarkdownComment" | "PostComment";
type CountRelationType = "PostCount" | "CommentCount";
type UpdateType = "Create" | "Delete";
type CountOperation = "Like" | "Dislike" | "Share";
type PostType = "Self" | "Other" | "Public" | "Recomand";
type DataType = "Follower" | "Followed" | "NotiFollower" | "NotiImage";
export type {
  MenuStruct,
  SubMenuProps,
  SideBarProps,
  NavBarProps,
  ProfileProps,
  listUserRepoPara,
  pullRepoPara,
  updateRepoPara,
  createRepoPara,
  CreateRepoProps,
  deleteRepoPara,
  repoPara,
  DeleteRepoProps,
  getRepoPara,
  getPublicRepoPara,
  uploadProfilePara,
  UploadProfileProps,
  UpdateRepoProps,
  UpdateUserProps,
  updateUserPara,
  getMarkdownPara,
  queryRepoMarkdownPara,
  Markdown,
  queryUserMarkdownPara,
  listUserPara,
  listActiveSessionPara,
  listSessionPara,
  banUserPara,
  banSessionrPara,
  SessionTableProps,
  loginUserPara,
  refreshTokenPara,
  createUserPara,
  MearmaidPara,
  downloadFilePara,
  verifyCodePara,
  resetPasswordPara,
  CreatePostProps,
  listUserVisiblePostPara,
  countUserPostPara,
  countUserInfoPara,
  Post,
  getPostPara,
  Comment,
  OComment,
  UserListProps,
  PostListPara,
  UserListPara,
  LikeListPara,
  RepoListPara,
  queryPostPara,
  queryUserPara,
  UserInfo,
  PostInfo,
  CommentType,
  CountRelationType,
  UpdateType,
  CountOperation,
  PostType,
  ErrorType,
  DataType,
};
