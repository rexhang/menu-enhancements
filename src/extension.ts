import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	// 注册命令
	const displayTheFileInExplorer = vscode.commands.registerCommand('extension.displayTheFileInExplorer', () => {
		// 获取当前活动编辑器的文件URI
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			vscode.window.showErrorMessage('没有活动的编辑器。');
			return;
		}

		// 获取当前编辑器的文件路径
		const filePath = activeEditor.document.uri.fsPath;

		// 获取文件所在的目录路径
		const fileDir = path.dirname(filePath);

		// 提示文件路径
		vscode.window.showInformationMessage(`已在资源管理器中打开 ${filePath} 所在目录并且选中`);

		console.log(`当前文件路径: ${filePath}`);

		// 打开资源管理器并选中文件所在的目录
		openFileExplorer(fileDir, filePath);
	});

	const copyRelativePath = vscode.commands.registerCommand('extension.copyRelativePath', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const filePath = editor.document.uri.fsPath;
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
      if (workspaceFolder) {
        const relativePath = path.relative(workspaceFolder.uri.fsPath, filePath);

				// 读取用户配置中的路径分隔符 默认 auto 不处理 如果 设置了 / 或者 \\ 则替换
        const configuration = vscode.workspace.getConfiguration('explorer');
				const separator: 'auto' | '/' | '\\' = configuration.get('copyRelativePathSeparator', 'auto');
				const formattedPath = ['/', '\\'].includes(separator) ? relativePath.replace(/\\/g, separator) : relativePath;

        vscode.env.clipboard.writeText(formattedPath);
        vscode.window.showInformationMessage(`已复制相对路径到剪贴板: ${formattedPath}`);
      } else {
        vscode.window.showErrorMessage('无法确定工作区文件夹。');
      }
    } else {
      vscode.window.showErrorMessage('没有活动的编辑器。');
    }
  });

	const copyAbsolutePath = vscode.commands.registerCommand('extension.copyAbsolutePath', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const filePath = editor.document.uri.fsPath;

			// 读取用户配置中的路径分隔符 默认 auto 不处理 如果 设置了 / 或者 \\ 则替换
			const configuration = vscode.workspace.getConfiguration('explorer');
			const separator: 'auto' | '/' | '\\' = configuration.get('copyRelativePathSeparator', 'auto');
			const formattedPath = ['/', '\\'].includes(separator) ? filePath.replace(/\\/g, separator) : filePath;

			// ps: windows中具备 直接访问 /xx/xx/xx 的能力 会自动转换为 \xx\xx\xx	所以不需要处理
      vscode.env.clipboard.writeText(formattedPath);
      vscode.window.showInformationMessage(`已复制绝对路径到剪贴板: ${formattedPath}`);
    } else {
      vscode.window.showErrorMessage('没有活动的编辑器。');
    }
  });

	context.subscriptions.push(displayTheFileInExplorer, copyRelativePath, copyAbsolutePath);
}

function openFileExplorer(directoryPath: string, filePath: string) {
	if (process.platform === 'win32') {
		// Windows系统下使用explorer命令并选中文件
		const command = `explorer /select,"${filePath}"`;

		exec(command, (err) => {
			if (err) {
				// 由于 Windows 上的 explorer /select 命令不提供返回结果，exec 函数会将错误信息输出到控制台。
				// 这就是为什么在控制台中会看到 ERR [Extension Host] Error: Command failed: ... 的错误信息。
				// 这个错误信息并不影响资源目录的打开，只是表明在执行命令时可能遇到了某些问题，但并不影响整体功能的实现。
				console.warn(err, '>>>>>>此错误并不影响逻辑功能，可以忽略。<<<<<<');
			}
		});
	} else {
		// 非Windows系统使用vscode.commands.executeCommand('revealInOS')方法
		vscode.commands.executeCommand('revealInOS', vscode.Uri.file(filePath));
	}
}
