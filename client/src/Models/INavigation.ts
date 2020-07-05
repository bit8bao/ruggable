export default interface INavigation {
     readonly id: string;
     readonly parentId: string;
     readonly name: string;
     readonly url: string;
     readonly icon: string;
     readonly description: string;
     readonly children: INavigation[] | null;
}
