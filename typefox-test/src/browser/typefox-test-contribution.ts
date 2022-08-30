import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry} from '@theia/core/lib/common';
import { CommonMenus, FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { IDependencyVersionCheckServer } from "../common/dependency-version-checker-protocoll";


export const dependencyVersionCheckCommand: Command = {
    id: 'dependencyVersionCheck.command',
    label: "check dependency versions"
};

@injectable()
export class TypefoxTestCommandContribution implements CommandContribution {

    @inject(IDependencyVersionCheckServer) depCheckServer: IDependencyVersionCheckServer;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(dependencyVersionCheckCommand, {
            execute: async () => {
                const mismatches = await this.depCheckServer.analyzeDependencies();
                console.log("mismatches recieved");
                console.log(mismatches);
            }
        });
    }
}

@injectable()
export class TypefoxTestMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: dependencyVersionCheckCommand.id,
            label: dependencyVersionCheckCommand.label
        });
    }
}