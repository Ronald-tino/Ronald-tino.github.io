import React from "react";
import BlogPost from "./BlogPost.jsx";
import dDriveImg from "../../Assets/d-drive-is-full.png";

function WslCustomDirectory() {
  const content = (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={dDriveImg} 
          alt="D Drive Full Illustration" 
          style={{ maxWidth: '750px', width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      
      <p>As a Cloud Engineer you may find yourself constantly using WSL (Windows Subsystem for Linux). The challenge is though it becomes very important to free up space on your drive C, often used for installing WSL as valuable storage is
        quickly consumed, especially when working with resource-intensive projects involving Kubernetes, Docker, and Terraform. If you are on Windows and you're like me the question of "why am I even using this system to develop cloud
        solutions" might even cross your mind.</p>

      <p>To explain that, many developers running WSL (Windows Subsystem for Linux) often face the challenge of limited space on their C drive. Now you might ask if you're using cloud tools that you shouldn't be using the cloud. I agree to
        a point; however, there are still a number of advantages to using a windows such as being able to test locally without incurring a heavy bill.</p>

      <p>I made the switch years ago from being a full apple guy to a windows machine since that allowed me to use simulation softwares that would be helpful in my then career. While I needed that then as my career shifts towards the cloud
        I keep finding myself using a workaround for the windows to use the cloud solutions. With that being the case, one thing that keeps getting on my nerves is storage on my Windows device.</p>

      <p>In this tutorial, I'll show you how to install Ubuntu (or another Linux distribution) within WSL in a custom directory on a different drive, freeing up space on your C drive.</p>

      <h2 className="purple">Problem:</h2>
      <ul>
        <li>WSL installs to C drive by default.</li>
        <li>Limited C drive space on your computer.</li>
        <li>Cloud-related projects (Kubernetes, Docker, Terraform) consume significant space.</li>
      </ul>

      <h2 className="purple">Solution:</h2>
      <ul>
        <li>Install WSL distribution in a custom directory on another drive (e.g., D drive).</li>
      </ul>

      <h2 className="purple">Prerequisites:</h2>
      <ul>
        <li>Windows Subsystem for Linux enabled.</li>
        <li>PowerShell.</li>
        <li>Administrative privileges.</li>
      </ul>
      <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />
      
      <h2 className="purple">Method 1: Installing Ubuntu 18.04 in WSL to D drive</h2>

      <h3>Step 1: Create Directory in D Drive</h3>
      <p>Create a folder where you'll install your distribution.</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`mkdir D:\\Ubuntu1804
cd D:\\Ubuntu1804`}</code>
      </pre>

      <h3>Step 2: Download Ubuntu Appx File</h3>
      <p>Download Ubuntu 18.04 appx file using PowerShell.</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`Invoke-WebRequest -Uri https://cloud-images.ubuntu.com/wsl/bionic/daily/ubuntu-1804-server-wsl.rootfs.tar.gz -OutFile Ubuntu.appx -UseBasicParsing`}</code>
      </pre>
      <p>The above command might not work so you can use the command:</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`Invoke-WebRequest -Uri https://aka.ms/wslubuntu1804 -OutFile Ubuntu.appx -UseBasicParsing`}</code>
      </pre>

      <h3>Step 3: Rename and Extract .appx Package</h3>
      <p>Rename the <code>.appx</code> file to <code>.zip</code> and extract its contents using PowerShell. This step reveals the executable and essential files.</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`Rename-Item .\\Ubuntu.appx Ubuntu.zip
Expand-Archive .\\Ubuntu.zip -DestinationPath .\\Ubuntu -Verbose`}</code>
      </pre>

      <h3>Step 4: Run ubuntu1804.exe or ubuntu.exe</h3>
      <p>After the command is done the files will automatically expand so go to your file and find the EXE file and run it.</p>

      <h3>Step 5: Launch and Configure Ubuntu</h3>
      <p>After Installation create a username and password. Once the setup is complete, a terminal window will appear, requesting you to create a UNIX username and password.</p>

      <h3>Step 6: Verify Installation</h3>
      <p>After the version 18 has been created which can be cross checked by checking:</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`wsl -l -v`}</code>
      </pre>
      
      <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />
      
      <h2 className="purple">Method 2: Manually Install Latest Ubuntu (e.g., 22.04 or 24.04) in a Custom Folder</h2>

      <h3>💡 1. Choose Version and Create Target Folder</h3>
      <p>Let's say you want Ubuntu 22.04. Create a folder for it:</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`mkdir D:\\Ubuntu2204
cd D:\\Ubuntu2204`}</code>
      </pre>

      <h3>🌐 2. Download the Ubuntu .appx Installer</h3>
      <p>Use this in PowerShell to download Ubuntu 22.04:</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`Invoke-WebRequest -Uri https://aka.ms/wslubuntu2204 -OutFile Ubuntu.appx -UseBasicParsing`}</code>
      </pre>
      <p>(Optional): For Ubuntu 24.04 (if available), you'd use:</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`Invoke-WebRequest -Uri https://aka.ms/wslubuntu2404 -OutFile Ubuntu.appx -UseBasicParsing`}</code>
      </pre>

      <h3>📦 3. Unpack the Installer</h3>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`Rename-Item .\\Ubuntu.appx Ubuntu.zip
Expand-Archive .\\Ubuntu.zip -DestinationPath .\\Ubuntu -Verbose
cd Ubuntu`}</code>
      </pre>

      <h3>🚀 4. Register the Distro with WSL</h3>
      <p>Now register it under WSL:</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`.\\ubuntu2204.exe`}</code>
      </pre>
      <p>(or <code>.\ubuntu.exe</code> depending on what's inside the folder)</p>
      <p>On first launch, it will ask you to create a UNIX username and password.</p>

      <h3>💾 5. (Optional) Set as Default Distro</h3>
      <p>If you want to make this the default distro:</p>
      <pre style={{ 
        backgroundColor: '#2d2d2d', 
        color: '#00ff00',
        padding: '15px', 
        borderRadius: '5px', 
        overflowX: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: '"Lucida Console", Monaco, monospace',
        border: '1px solid #444'
      }}>
        <code>{`wsl --set-default Ubuntu-22.04`}</code>
      </pre>
      <p>(You can check name with <code>wsl -l</code>)</p>
      
      <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />
      
      <h2 className="purple">Explanation:</h2>
      <ul>
        <li><strong><code>mkdir D:\Ubuntu1804</code></strong>: Creates a directory named "Ubuntu1804" on your D drive.</li>
        <li><strong><code>cd D:\Ubuntu1804</code></strong>: Changes the current directory in PowerShell to the newly created folder.</li>
        <li><strong><code>Invoke-WebRequest</code></strong>: Downloads the Ubuntu distribution file (appx) from Microsoft's servers. The <code>-UseBasicParsing</code> parameter is added for compatibility.</li>
        <li><strong><code>Rename-Item</code></strong>: Renames the downloaded <code>.appx</code> file to <code>.zip</code>.</li>
        <li><strong><code>Expand-Archive</code></strong>: Extracts the contents of the renamed <code>.zip</code> file into a subfolder.</li>
        <li><strong><code>.\ubuntu1804.exe</code></strong>: Launch the WSL application and create the user.</li>
        <li><strong><code>wsl -l -v</code></strong>: list out the versions for linux and show which of the versions has been created.</li>
      </ul>

      <h2 className="purple">Conclusion:</h2>
      <p>By following these steps, you can effectively manage your disk space and improve the performance of your system while continuing to utilize the benefits of WSL for cloud-related projects. This will ensure that your resources are directed
        to the correct drivers and you will avoid the errors associated with memory.</p>
    </div>
  );

  return (
    <BlogPost
      title="Free Up Disk C: Installing WSL (Ubuntu) in a Custom Directory (And Why I Regret Ditching Mac!)"
      subtitle="Save space on your C drive and manage your WSL installations more effectively."
      author="Ron-Tino"
      date="June 15, 2025"
      content={content}
    />
  );
}

export default WslCustomDirectory;
