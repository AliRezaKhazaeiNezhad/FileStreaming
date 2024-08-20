using KHN.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;
using System.Net.Http.Headers;

namespace KHN.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AudioController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public AudioController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public IActionResult GetAudio()
        {
            // مسیر فایل صوتی
            string audioFilePath = Path.Combine(_env.WebRootPath, "sampleaudio.mp3");

            // بررسی وجود فایل صوتی
            if (!System.IO.File.Exists(audioFilePath))
            {
                return NotFound();
            }


            // استریم کردن فایل صوتی
            var audioFileStream = new FileStream(audioFilePath, FileMode.Open);


            // تولید یک فایل با نامی که IDM را فریب دهد و با یک نوع فایل که IDM را فریب دهد
            var fakeFile = new MemoryStream();
            fakeFile.Position = 0;


            // تنظیم هدرها برای جلوگیری از دانلود فایل توسط IDM
            Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate");
            Response.Headers.Add("Content-Type", "text/html");
            Response.Headers.Add("Content-Disposition", "inline");
            Response.Headers.Add("X-Download-Options", "noopen");
            Response.Headers.Add("X-Robots-Tag", "noindex, nofollow");
            Response.Headers.Add("Accept-Ranges", "none");

            // بازگشت فایل با نامی که IDM را فریب دهد و با یک نوع فایل که IDM را فریب دهد
            return File(audioFileStream, "text/html", "index.html");
        }
    }
}
