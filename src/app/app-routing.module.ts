import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/wishes", pathMatch: "full" },
  {
    path: "wishes",
    loadChildren: () =>
      import("./wishes/wishes.module").then(m => m.WishesModule)
  },
  {
    path: "have-list",
    loadChildren: () =>
      import("./have-list/have-list.module").then(
        m => m.HaveListModule
      )
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
