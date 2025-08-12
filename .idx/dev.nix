
{ pkgs, ... }:

{ environment.systemPackages = with pkgs; [  # Corrected typo here
    sudo
    python311Packages.pip
  ];
}