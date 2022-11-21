Set WshShell = CreateObject("Wscript.Shell")

strPath = Wscript.ScriptFullName
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.GetFile(strPath)
strFolder = objFSO.GetParentFolderName(objFile) 
path = objFSO.BuildPath(strFolder, "/dados/launch_app.bat")

WshShell.Run chr(34) & path & Chr(34), 0
Set WshShell = Nothing