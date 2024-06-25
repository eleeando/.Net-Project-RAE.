namespace FinalProjectV02.Server.Services;

public interface IManageFiles
{
    Task<string> UploadFile(IFormFile _IFormFile);
    Task<(byte[], string, string)> DownloadFile(string FileName);
  
}
